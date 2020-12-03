const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');
const x = localStorage.getItem('x');
const xObject = JSON.parse(x) //把字符串转换对象
const hashMap = xObject || [{
        'logo': "./images/acfun.png",
        'logoType': 'image',
        'url': 'https://acfun.cn'
    },
    {
        'logo': "./images/bilibili.png",
        'logoType': 'image',
        'url': 'https://bilibili.com'
    },
    {
        'logo': "./images/zhihu.png",
        'logoType': 'image',
        'url': 'https://zhihu.com'
    }
]
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www', '')

}
const render = () => {
    hashMap.forEach(node => {

        const $li = $(`
    <li>
        <a href="${node.url}">
            <div class="site">
                <div class="logo">
                    ${node.url[0]}
                </div> 
                <div class="link">${simplifyUrl(node.url)}</div> 
            </div> 
        </a>
    </li>
    `).insertBefore($lastLi);
    })
}

render();
$('.addButton').on('click', () => {
    let url = window.prompt("请问你要添加的网址是啥？")
    if (url.indexOf('http') !== 0) {
        url = "https://" + url
    }
    hashMap.push({
        'logo': url[0],
        'logoType': 'text',
        "url": url
    })
    $siteList.find('li:not(.last)').remove();
    render();
})

//关闭页面之前触发
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap) //把对象变成字符串
    localStorage.setItem('x', string)
}