(() => {
    // function bind(nodes, event, handler) {
    function bind(arr, event, handler) {
        // console.log('bind arr', arr);
        // console.log('bind nodes', nodes);
        // Array.from(nodes).forEach(node => {
        arr.forEach(node => {
            node.addEventListener(event, handler);
        });
    }

    // function makeTabs(node) {
        
    function makeTabs() {
        // let node = document.querySelectorAll('.main__devices');
        let node = document.getElementsByClassName('main__devices')[0];
        // console.log('makeTabs node', node);
        let selectedNode = node.querySelector('.section__tab_active');
        let selected = selectedNode.dataset.id;
        // let selected = node.querySelector('.section__tab_active').dataset.id;
        const tabs = node.querySelectorAll('.section__tab');
        // console.log('tabs', tabs);
        let arr = Array.from(tabs);
        const list = arr.map(node => node.dataset.id);
        // const list = Array.from(tabs).map(node => node.dataset.id);
        console.log('list', list);
        // const list = tabs.map(node => node.dataset.id);
        const select = node.querySelector('.section__select');

        function selectTab(newId) {
            const newTab = node.querySelector(`.section__tab[data-id=${newId}]`);
            const newPanel = node.querySelector(`.section__panel[data-id=${newId}]`);
            // const oldTab = selectedNode;
            const oldTab = node.querySelector('.section__tab_active');
            const oldPanel = node.querySelector('.section__panel:not(.section__panel_hidden)');

            selected = newId;

            let oldTabClassList = oldTab.classList;
            // console.log('oldTabClassList', oldTabClassList);
            // oldTabClassList.remove('section__tab_active');
            oldTab.classList.remove('section__tab_active');
            oldTab.setAttribute('aria-selected', 'false');
            oldTab.removeAttribute('tabindex');
            newTab.classList.add('section__tab_active');
            // oldTabClassList.add('section__tab_active');
            newTab.setAttribute('aria-selected', 'true');
            newTab.setAttribute('tabindex', '0');
            newTab.focus({
                preventScroll: true
            });

            oldPanel.classList.add('section__panel_hidden');
            oldPanel.setAttribute('aria-hidden', 'true');
            newPanel.classList.remove('section__panel_hidden');
            newPanel.setAttribute('aria-hidden', 'false');

            select.value = newId;
        }

        select.addEventListener('input', () => {
            selectTab(select.value);
        });

        // bind(tabs, 'click', event => {
        bind(arr, 'click', event => {
            const newId = event.target.dataset.id;
            selectTab(newId);
        });

        // bind(tabs, 'keydown', event => {
        bind(arr, 'keydown', event => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
                return;
            }

            let index = list.indexOf(selected);
            let eventWhich = event.which;
            let listLength = list.length;
            if (eventWhich === 37) {
                // left
                --index;
            } else if (eventWhich === 39) {
                // right
                ++index;
            } else if (eventWhich === 36) {
                // home
                index = 0;
            } else if (eventWhich === 35) {
                // end
                index = listLength - 1;
                // index = list.length - 1;
            } else {
                return;
            }

            // if (index >= list.length) {
            if (index >= listLength) {
                index = 0;
            } else if (index < 0) {
                index = listLength - 1;
                // index = list.length - 1;
            }

            selectTab(list[index]);
            event.preventDefault();
        });
    }

    // function makeMenu(node) {
    function makeMenu() {
        let node = document.getElementsByClassName('header__menu')[0];
        // console.log('makeMenu node', node);
        // let node = document.querySelectorAll('.header__menu');
        let expanded = false;
        const links = document.querySelector('.header__links');

        node.addEventListener('click', () => {
            expanded = !expanded;
            // node.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            node.setAttribute('aria-expanded', expanded);
            node.querySelector('.header__menu-text').textContent = expanded ? 'Закрыть меню' : 'Открыть меню';
            links.classList.toggle('header__links_opened', expanded);
            links.classList.add('header__links-toggled');
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        // let main__devices = Array.from(document.querySelectorAll('.main__devices'));
        // makeTabs(main__devices[0]);
        makeTabs();
        // let header__menu = Array.from(document.querySelectorAll('.header__menu'));
        // makeMenu(header__menu[0]);
        makeMenu();
        // Array.from(document.querySelectorAll('.main__devices')).forEach(makeTabs);
        // Array.from(document.querySelectorAll('.header__menu')).forEach(makeMenu);
    });
})();
