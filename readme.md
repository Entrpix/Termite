# <img src="logo.svg" alt="Logo" width="50" style="vertical-align:middle"> Termite
Webproxy but Terminal

## Usage
```
clear - Clears the console
version - Displays verison and info of Termite
help - Ya just ran it :3
site *url or query* - Visit the required site (url: URL) (query: string)
proxy *backend* - Sets webproxy (backend: uv or dynamic)
cloak *type* *value* - Cloaks the tab (types: title, favicon) (value: string or URL)
reset - Resets tab cloaking
ab - Open site in about:blank
se *URL* - Sets search engine (URL: URL)
register - Registers service worker (Run if errors occur)
```

## Installation
```sh
$ git clone https://github.com/entrpix/termite
$ cd termite
$ npm i
$ npm start
```
Deployment guide can be found [Here](deployment.md) (Requires a VPS and a Domain)

## TODO
- [ ] Add JS Injection
- [ ] User-Agent Spoofing
- [X] Change Dynamic Config Path
- [ ] Add Proxy Modes (Embed, Direct, Etc.)
- [ ] Custom Bare Server
- [ ] Blob: Cloaker
- [ ] Custom Themes
- [ ] Custom Commands (aliases)

## Contributors
- Entrpix - Frontend, Terminal Engine
- Riftriot - Fixing Backend

## Credit
- Bare Server - https://github.com/tomphttp/bare-server-node/
- Ultraviolet:
    - https://github.com/titaniumnetwork-dev/Ultraviolet/
    - https://github.com/titaniumnetwork-dev/Ultraviolet-App/
    - https://github.com/titaniumnetwork-dev/Ultraviolet-Static/
- Dynamic - https://github.com/nebulaservices/dynamic/
