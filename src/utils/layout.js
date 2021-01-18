export const layout = () => {
    const margin = { top: 20, right: 10, bottom: 0, left: 10 };
    const width = (window.innerWidth > 500 ? 500 : window.innerWidth)- margin.left - margin.right;
    const height = (window.innerWidth > 500 ? 500 : window.innerWidth) - margin.top - margin.bottom;
    return { margin, width, height };
}
