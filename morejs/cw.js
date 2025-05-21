//Cw.js | ClassicWindow, a web window manager

/** (thx claude for the doc)
 * ClassicWindow Library
 *
 * This script defines a library for creating and managing custom window-like
 * UI components within a web page. It provides functionality to create,
 * manipulate, and interact with these windows, mimicking the behavior of
 * traditional desktop window managers.
 *
 * @namespace ClassicWindow
 */

/**
 * Initializes the ClassicWindow library by injecting necessary styles into the document.
 * This function is called automatically when the library is loaded.
 *
 * @function
 * @name initializeStyles
 * @memberof ClassicWindow
 * @private
 */

/**
 * Creates a container for minimized windows (taskbar) if it doesn't already exist.
 *
 * @function
 * @name ensureTaskbarContainer
 * @memberof ClassicWindow
 * @param {number} [x=10] - The horizontal position of the taskbar container.
 * @param {number} [y=10] - The vertical position of the taskbar container.
 * @returns {HTMLElement} The taskbar container element.
 * @private
 */

/**
 * Calculates the highest z-index value among all existing windows.
 *
 * @function
 * @name getTopZIndex
 * @memberof ClassicWindow
 * @returns {number} The highest z-index value.
 */

/**
 * Creates a new window with the specified options.
 *
 * @function
 * @name createWindow
 * @memberof ClassicWindow
 * @param {Object} [options={}] - Configuration options for the window.
 * @param {string} [options.title='Window'] - The title of the window.
 * @param {string|HTMLElement} [options.content=''] - The content of the window. Can be a string or an HTMLElement.
 * @param {number} [options.width=400] - The width of the window.
 * @param {number} [options.height=300] - The height of the window.
 * @param {number} [options.x=50] - The horizontal position of the window.
 * @param {number} [options.y=50] - The vertical position of the window.
 * @param {string} [options.statusText=''] - The status text displayed at the bottom of the window.
 * @param {function} [options.onClose=null] - Callback function triggered when the window is closed.
 * @param {function} [options.onMinimize=null] - Callback function triggered when the window is minimized.
 * @param {function} [options.onMaximize=null] - Callback function triggered when the window is maximized.
 * @param {function} [options.onRestore=null] - Callback function triggered when the window is restored from maximized state.
 * @param {boolean} [options.draggable=true] - Whether the window can be dragged.
 * @param {boolean} [options.resizable=true] - Whether the window can be resized.
 * @param {string} [options.icon=null] - The URL of the icon displayed in the window's title bar.
 * @param {number} [options.taskbarX=10] - The horizontal position of the taskbar button when the window is minimized.
 * @param {number} [options.taskbarY=10] - The vertical position of the taskbar button when the window is minimized.
 * @param {string} [options.theme=null] - The theme of the window ('light', 'dark', or null for system default).
 * @returns {HTMLElement} The created window element.
 */

/**
 * Gets all currently open windows.
 *
 * @function
 * @name getAllWindows
 * @memberof ClassicWindow
 * @returns {HTMLElement[]} An array of all window elements.
 */

/**
 * Closes all currently open windows and clears the taskbar.
 *
 * @function
 * @name closeAllWindows
 * @memberof ClassicWindow
 */

/**
 * Updates the content of a specified window.
 *
 * @function
 * @name updateWindowContent
 * @memberof ClassicWindow
 * @param {HTMLElement} windowElement - The window element to update.
 * @param {string|HTMLElement} newContent - The new content for the window. Can be a string or an HTMLElement.
 */

/**
 * Updates the status text of a specified window.
 *
 * @function
 * @name updateStatusText
 * @memberof ClassicWindow
 * @param {HTMLElement} windowElement - The window element to update.
 * @param {string} newStatusText - The new status text for the window.
 */

/**
 * Sets the theme for all windows. If a window has its own theme set, it will override this setting.
 *
 * @function
 * @name setGlobalTheme
 * @memberof ClassicWindow
 * @param {string} theme - The theme to set ('light', 'dark', or 'system').
 */

/**
 * Updates the theme of a specified window.
 *
 * @function
 * @name updateWindowTheme
 * @memberof ClassicWindow
 * @param {HTMLElement} windowElement - The window element to update.
 * @param {string} theme - The theme to set ('light', 'dark', or 'system').
 */

/**
 * Gets the current system theme preference.
 *
 * @function
 * @name getSystemTheme
 * @memberof ClassicWindow
 * @returns {string} The system theme ('light' or 'dark').
 * @private
 */
(function(g) {
    'use strict';
    let globalTheme = 'system';
    function getSystemTheme() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    function applyTheme(element, theme) {
        if (theme === 'system')
            theme = getSystemTheme();
        if (theme === 'dark') {
            element.classList.add('c-dark');
            element.classList.remove('c-light')
        } else {
            element.classList.add('c-light');
            element.classList.remove('c-dark')
        }
    }
    function i() {
        if (!document.getElementById('c-s')) {
            const s = document.createElement('style');
            s.id = 'c-s';
            s.textContent = '.c-w{position:absolute;border-radius:8px;box-shadow:0 10px 25px rgba(0,0,0,.25);overflow:hidden;min-width:100px;min-height:80px;z-index:100;font-family:"Segoe UI",sans-serif;backdrop-filter:blur(10px)}.c-w.c-light{background-color:rgba(245,245,245,.95);border:1px solid rgba(0,0,0,.1)}.c-w.c-dark{background-color:rgba(32,32,32,.95);border:1px solid rgba(255,255,255,.1)}.c-tb{background:transparent;padding:8px 12px;font-weight:normal;cursor:move;display:flex;justify-content:space-between;align-items:center;user-select:none;height:28px}.c-light .c-tb{color:#333}.c-dark .c-tb{color:white}.c-t{font-size:13px;margin-right:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px}.c-icon{width:16px;height:16px;margin-right:6px;object-fit:contain}.c-cs{display:flex;gap:4px}.c-c{width:24px;height:24px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:10px;opacity:.7;transition:all .2s;border-radius:4px}.c-light .c-c{color:#333}.c-dark .c-c{color:#fff}.c-c:hover{opacity:1}.c-light .c-c:hover{background-color:rgba(0,0,0,.1)}.c-dark .c-c:hover{background-color:rgba(255,255,255,.1)}.c-m svg,.c-x svg,.c-cl svg{width:10px;height:10px;fill:currentColor}.c-cl:hover{background-color:#e81123;color:#fff;opacity:1}.c-cnt{padding:15px;overflow:auto;font-size:14px;height:calc(100% - 66px);box-sizing:border-box}.c-light .c-cnt{color:#333}.c-dark .c-cnt{color:#f0f0f0}.c-sb{padding:6px 15px;font-size:12px;position:absolute;bottom:0;width:100%;box-sizing:border-box}.c-light .c-sb{background-color:rgba(245,245,245,.7);border-top:1px solid rgba(0,0,0,.05);color:#777}.c-dark .c-sb{background-color:rgba(32,32,32,.7);border-top:1px solid rgba(255,255,255,.05);color:#bbb}.c-w.max{width:100%!important;height:100%!important;top:0!important;left:0!important;border-radius:0!important}.c-mb{border-radius:6px;cursor:pointer;margin:5px;font-size:12px;font-family:"Segoe UI",sans-serif;transition:all .2s;display:flex;align-items:center;gap:8px;padding:8px 15px}.c-mb.c-light{background:rgba(245,245,245,.9);color:#333;border:1px solid rgba(0,0,0,.1)}.c-mb.c-dark{background:rgba(32,32,32,.9);color:white;border:1px solid rgba(255,255,255,.1)}.c-mb.c-light:hover{background:rgba(235,235,235,.9)}.c-mb.c-dark:hover{background:rgba(45,45,45,.9)}.c-mb-icon{width:14px;height:14px;object-fit:contain}.c-rs{position:absolute;width:10px;height:10px;background:transparent;cursor:nwse-resize;bottom:0;right:0;z-index:101}';
            document.head.appendChild(s);
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', () => {
                document.querySelectorAll('.c-w').forEach(w => {
                    if (w.dataset.theme === 'system')
                        applyTheme(w, 'system')
                }
                );
                document.querySelectorAll('.c-mb').forEach(mb => {
                    const windowElement = document.getElementById(mb.dataset.windowId);
                    if (windowElement && windowElement.dataset.theme === 'system')
                        applyTheme(mb, 'system')
                }
                )
            }
            )
        }
    }
    function e(x=10, y=10) {
        let c = document.getElementById('c-mc');
        if (!c) {
            c = document.createElement('div');
            c.id = 'c-mc';
            c.style.position = 'fixed';
            c.style.bottom = y + 'px';
            c.style.left = x + 'px';
            c.style.zIndex = '1000';
            document.body.appendChild(c)
        }
        return c
    }
    function t() {
        const w = document.querySelectorAll('.c-w');
        let m = 100;
        w.forEach(n => {
            const z = parseInt(window.getComputedStyle(n).zIndex, 10);
            if (!isNaN(z) && z > m)
                m = z
        }
        );
        return m
    }
    function c(o={}) {
        i();
        const d = {
            title: 'Window',
            content: '',
            width: 400,
            height: 300,
            x: 50,
            y: 50,
            statusText: '',
            onClose: null,
            onMinimize: null,
            onMaximize: null,
            onRestore: null,
            draggable: !0,
            resizable: !0,
            icon: null,
            taskbarX: 10,
            taskbarY: 10,
            theme: null
        }
          , s = Object.assign({}, d, o)
          , w = document.createElement('div');
        w.className = 'c-w';
        w.dataset.theme = s.theme || globalTheme;
        applyTheme(w, w.dataset.theme);
        w.style.width = s.width + 'px';
        w.style.height = s.height + 'px';
        w.style.left = s.x + 'px';
        w.style.top = s.y + 'px';
        w.dataset.title = s.title;
        w.id = 'cw-' + Date.now();
        const b = document.createElement('div');
        b.className = 'c-tb';
        const l = document.createElement('div');
        l.className = 'c-t';
        if (s.icon) {
            const ic = document.createElement('img');
            ic.className = 'c-icon';
            ic.src = s.icon;
            l.appendChild(ic)
        }
        const titleText = document.createTextNode(s.title);
        l.appendChild(titleText);
        const k = document.createElement('div');
        k.className = 'c-cs';
        const n = document.createElement('div');
        n.className = 'c-c c-m';
        n.innerHTML = '<svg viewBox="0 0 10 1"><path d="M0,0.5 L10,0.5" stroke="currentColor" stroke-width="1"/></svg>';
        n.title = 'Minimize';
        const x = document.createElement('div');
        x.className = 'c-c c-x';
        x.innerHTML = '<svg viewBox="0 0 10 10"><rect x="0" y="0" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1"/></svg>';
        x.title = 'Maximize';
        const q = document.createElement('div');
        q.className = 'c-c c-cl';
        q.innerHTML = '<svg viewBox="0 0 10 10"><path d="M1,1 L9,9 M9,1 L1,9" stroke="currentColor" stroke-width="1.5"/></svg>';
        q.title = 'Close';
        k.appendChild(n);
        k.appendChild(x);
        k.appendChild(q);
        b.appendChild(l);
        b.appendChild(k);
        const j = document.createElement('div');
        j.className = 'c-cnt';
        if (typeof s.content === 'string')
            j.innerHTML = s.content;
        else if (s.content instanceof HTMLElement)
            j.appendChild(s.content);
        const f = document.createElement('div');
        f.className = 'c-sb';
        f.textContent = s.statusText;
        w.appendChild(b);
        w.appendChild(j);
        w.appendChild(f);
        document.body.appendChild(w);
        if (s.resizable) {
            const rs = document.createElement('div');
            rs.className = 'c-rs';
            w.appendChild(rs);
            let isResizing = false;
            let startX = 0;
            let startY = 0;
            let startWidth = 0;
            let startHeight = 0;
            rs.addEventListener('mousedown', function(e) {
                if (w.classList.contains('max'))
                    return;
                isResizing = true;
                startX = e.clientX;
                startY = e.clientY;
                startWidth = parseInt(window.getComputedStyle(w).width, 10);
                startHeight = parseInt(window.getComputedStyle(w).height, 10);
                w.style.zIndex = t() + 1;
                e.preventDefault();
            });
            document.addEventListener('mousemove', function(e) {
                if (!isResizing)
                    return;
                const width = startWidth + (e.clientX - startX);
                const height = startHeight + (e.clientY - startY);
                if (width > 100)
                    w.style.width = width + 'px';
                if (height > 80)
                    w.style.height = height + 'px';
            });
            document.addEventListener('mouseup', function() {
                isResizing = false;
            });
        }
        q.addEventListener('click', () => {
            if (typeof s.onClose === 'function')
                s.onClose();
            w.remove()
        }
        );
        n.addEventListener('click', () => {
            w.style.display = 'none';
            if (typeof s.onMinimize === 'function')
                s.onMinimize();
            const r = e(s.taskbarX, s.taskbarY)
              , h = document.createElement('button');
            h.className = 'c-mb';
            const windowTheme = w.dataset.theme || globalTheme;
            h.dataset.windowId = w.id;
            h.dataset.theme = windowTheme;
            applyTheme(h, windowTheme);
            if (s.icon) {
                const mbIcon = document.createElement('img');
                mbIcon.className = 'c-mb-icon';
                mbIcon.src = s.icon;
                h.appendChild(mbIcon)
            }
            h.appendChild(document.createTextNode(s.title));
            h.addEventListener('click', () => {
                w.style.display = 'block';
                w.style.zIndex = t() + 1;
                h.remove()
            }
            );
            r.appendChild(h)
        }
        );
        let y = {
            width: s.width,
            height: s.height,
            x: s.x,
            y: s.y
        };
        function toggleMaximize() {
            if (w.classList.contains('max')) {
                w.classList.remove('max');
                w.style.width = y.width + 'px';
                w.style.height = y.height + 'px';
                w.style.left = y.x + 'px';
                w.style.top = y.y + 'px';
                x.innerHTML = '<svg viewBox="0 0 10 10"><rect x="0" y="0" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1"/></svg>';
                if (typeof s.onRestore === 'function')
                    s.onRestore()
            } else {
                y = {
                    width: w.offsetWidth,
                    height: w.offsetHeight,
                    x: w.offsetLeft,
                    y: w.offsetTop
                };
                w.classList.add('max');
                x.innerHTML = '<svg viewBox="0 0 10 10"><path d="M3,3 v-2 h7 v7 h-2 M0,3 h7 v7 h-7 z" fill="none" stroke="currentColor" stroke-width="1"/></svg>';
                if (typeof s.onMaximize === 'function')
                    s.onMaximize()
            }
        }
        x.addEventListener('click', toggleMaximize);
        b.addEventListener('dblclick', toggleMaximize);
        if (s.draggable) {
            let p = !1
              , v = 0
              , u = 0;
            b.addEventListener('mousedown', a => {
                if (w.classList.contains('max'))
                    return;
                if (a.target !== b && a.target !== l && !l.contains(a.target))
                    return;
                p = !0;
                v = a.clientX - w.offsetLeft;
                u = a.clientY - w.offsetTop;
                w.style.zIndex = t() + 1
            }
            );
            document.addEventListener('mousemove', a => {
                if (!p)
                    return;
                const newX = a.clientX - v;
                const newY = a.clientY - u;
                w.style.left = newX + 'px';
                w.style.top = newY + 'px';
            }
            );
            document.addEventListener('mouseup', () => {
                p = !1;
                if (!w.classList.contains('max') && parseInt(w.style.top) < 10) {
                    y = {
                        width: w.offsetWidth,
                        height: w.offsetHeight,
                        x: w.offsetLeft,
                        y: w.offsetTop
                    };
                    toggleMaximize();
                }
            }
            );
        }
        w.addEventListener('mousedown', () => {
            w.style.zIndex = t() + 1
        }
        );
        w.style.zIndex = t() + 1;
        return w
    }
    function a() {
        return Array.from(document.querySelectorAll('.c-w'))
    }
    function b() {
        a().forEach(w => w.remove());
        const c = document.getElementById('c-mc');
        if (c)
            c.innerHTML = ''
    }
    function u(w, c) {
        if (!w || !w.classList.contains('c-w'))
            return;
        const j = w.querySelector('.c-cnt');
        if (!j)
            return;
        if (typeof c === 'string')
            j.innerHTML = c;
        else if (c instanceof HTMLElement) {
            j.innerHTML = '';
            j.appendChild(c)
        }
    }
    function s(w, t) {
        if (!w || !w.classList.contains('c-w'))
            return;
        const b = w.querySelector('.c-sb');
        if (b)
            b.textContent = t
    }
    function setGlobalTheme(theme) {
        if (['light', 'dark', 'system'].includes(theme)) {
            globalTheme = theme;
            a().forEach(w => {
                if (!w.dataset.theme || w.dataset.theme === globalTheme) {
                    w.dataset.theme = globalTheme;
                    applyTheme(w, globalTheme)
                }
            }
            );
            document.querySelectorAll('.c-mb').forEach(mb => {
                const windowId = mb.dataset.windowId;
                const windowEl = document.getElementById(windowId);
                if (windowEl && (!windowEl.dataset.theme || windowEl.dataset.theme === globalTheme)) {
                    mb.dataset.theme = globalTheme;
                    applyTheme(mb, globalTheme)
                }
            }
            )
        }
    }
    function updateWindowTheme(w, theme) {
        if (!w || !w.classList.contains('c-w') || !['light', 'dark', 'system'].includes(theme))
            return;
        w.dataset.theme = theme;
        applyTheme(w, theme);
        const taskbarBtn = document.querySelector(`.c-mb[data-window-id="${w.id}"]`);
        if (taskbarBtn) {
            taskbarBtn.dataset.theme = theme;
            applyTheme(taskbarBtn, theme)
        }
    }
    g.ClassicWindow = {
        createWindow: c,
        getAllWindows: a,
        closeAllWindows: b,
        updateWindowContent: u,
        updateStatusText: s,
        getTopZIndex: t,
        setGlobalTheme: setGlobalTheme,
        updateWindowTheme: updateWindowTheme
    }
}
)(typeof window !== 'undefined' ? window : this);
