function insertNavs() {
  const html =
    `
      <ul>
        <li>文档<ul>
          <li><a href="https://cryptape.github.io/Nervos-Docs" >Nervos Network</a></li>
          <li><a href="https://cryptape.github.io/Nervos-AppChain-Docs/" >AppChain</a></li>
          <li><a href="#/" class="active">CITA</a><!-- the above part should be indentical to https://raw.githubusercontent.com/cryptape/Nervos-Docs/master/_navbar.md --></li>
        </ul>
        </li>
        <li>语言<ul>
          <li><a href="#/">English</a></li>
          <li><a href="#/zh-CN/get-started/intro">中文</a></li>
        </ul>
        </li>
      </ul>
    `

  nav = document.querySelector('nav')
  nav.innerHTML = html

}
window.onload = insertNavs
