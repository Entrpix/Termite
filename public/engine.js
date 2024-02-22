document.addEventListener('DOMContentLoaded', function () {
    const Container = document.getElementById('container');
    const userInput = document.getElementById('user-input');

    var searchEngine = localStorage.getItem('searchEngine');

    var cloakTitle = localStorage.getItem('title');
    document.title = cloakTitle;

    if (!cloakTitle) {
        localStorage.setItem('title', "Termite");
        document.title = cloakTitle;
    };

    let favicon = localStorage.getItem('favicon') || `${window.location.href}/favicon.svg`;
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = favicon;
    document.getElementsByTagName('head')[0].appendChild(link);

    function addLine(text) {
        const line = document.createElement('div');
        line.textContent = text;
        Container.appendChild(line);
        Container.scrollTop = Container.scrollHeight;
    };

    function handleCommand(command) {
        addLine('$ ' + command);

        const commandParts = command.split(' ');
        const commandName = commandParts[0].toLowerCase();

        switch (commandName) {
            case 'clear':
                Container.innerHTML = '';
                break;
            case 'version':
                version();
                break;
            case 'help':
                help();
                break;
            case 'register':
                registerSW();
                break;
            case 'site':
                url(commandParts.slice(1).join(' '));
                break;  
            case 'se':
                setSearchEngine(commandParts.slice(1).join(' '));
                break;
            case 'cloak':
                cloak(commandParts[1], commandParts.slice(2).join(' '));
                break;
            case 'reset':
                reset();
                break;
            case 'ab':
                ab();
                break;
            default:
                unknown();
        };

        userInput.value = '';
    };

    userInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const command = userInput.value.trim();
            handleCommand(command);
        };
    });

    function unknown() {
        addLine('Command not recognized.');
    };

    function version() {
        addLine('Termite - Terminal Webproxy');
        addLine('Version: v0.1.0 (Beta Release)');
        addLine('License: GPL-3');
        addLine('Source Code: https://github.com/entrpix/Termite');
        addLine('Base Engine: https://github.com/entrpix/FUKK-8');
    };

    function help() {
        addLine('clear - Clears the console');
        addLine('version - Displays verison and info of Termite');
        addLine('help - Ya just ran it :3');
        addLine('site *url or query* - Visit the required site (url: URL) (query: string)');
        addLine('[TODO] proxy *backend* - Sets webproxy (backend: uv or dynamic)');
        addLine('cloak *type* *value* - Cloaks the tab (types: title, favicon) (value: string or URL)');
        addLine('reset - Resets tab cloaking');
        addLine('ab - Open site in about:blank');
        addLine('se *URL* - Sets search engine (URL: URL)');
        addLine('register - Registers service worker (Run if errors occur)');
    };

    function registerSW() {
        try {
            registerSW();
            location.reload();
        } catch (err) {
            addLine("Failed to register service worker.");
            addLine(err.toString());
        };
    };
    
    function search(input, template) {
        try {

            return new URL(input).toString();
        } catch (err) {
            // input was not a valid URL
        };

        try {
            const url = new URL(`http://${input}`);
            if (url.hostname.includes(".")) return url.toString();
        } catch (err) {
            // input was not valid URL
        };

        return template.replace("%s", encodeURIComponent(input));
    };

    function url(input) {
        const url = search(input, searchEngine);
        location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    };

    function setSearchEngine(url) {
        localStorage.setItem('searchEngine', url);
    }

    function cloak(Type, Value) {
        if (Type === "title") {
            localStorage.setItem('title', Value);
            document.title = Value;
        } else if (Type === "favicon") {
            let faviconUrl = `https://www.google.com/s2/favicons?domain=${Value}`;
            localStorage.setItem('favicon', faviconUrl);
            let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = faviconUrl;
            document.getElementsByTagName('head')[0].appendChild(link);
        }
    }

    function reset() {
        localStorage.removeItem('title');
        localStorage.removeItem('favicon');
        document.title = "Termite";
        let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = `${window.location.href}/favicon.svg`;
        document.getElementsByTagName('head')[0].appendChild(link);
    };

    if (location.pathname.startsWith(__uv$config.prefix)) {
        addLine("Error: The service worker is not registered. Run 'register'");
    };

    function ab() {
        var win = window.open()
        var url = `${window.location.href}`
        var iframe = win.document.createElement('iframe')
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";
        iframe.style.overflow = "hidden";
        iframe.style.margin = "0";
        iframe.style.padding = "0";
        iframe.style.position = "fixed";
        iframe.style.top = "0";
        iframe.style.bottom = "0";
        iframe.style.left = "0";
        iframe.style.right = "0";
        iframe.src = url
        win.document.body.appendChild(iframe)
    };
});