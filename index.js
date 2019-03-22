window.addEventListener('load', () => {
    console.log('onLoad')
})

window.addEventListener('DOMContentLoaded', () => {
    console.log('onDomLoad')

    const root = document.getElementById('root');
    const container = document.createElement('card-container');
    
    root.appendChild(container);
})