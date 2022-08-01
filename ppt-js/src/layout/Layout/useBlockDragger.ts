export function useBlockDragger(focusData: any) {
    let dragState = {
        startX: 0,
        startY: 0,
        startPos: [] as any[],
    }

    const mousedown = (e: any) => {
        dragState = {
            startX: e.clientX,
            startY: e.clientY,  //记录每一个选中的位置
            // @ts-ignore
            startPos: focusData.value.focus.map(({top, left}) => ({top, left})),
            //<html>TS2322: Type '{ startX: any; startY: any; startPos: { top: any; left: any; }[]; }' is not assignable to type '{ startX: number; startY: number; }'.<br/>Object literal may only specify known properties, and 'startPos' does not exist in type '{ startX: number; startY: number; }'.
        }
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
    }

    const mousemove = (e: any) => {
        let {clientX: moveX, clientY: moveY} = e;  //解构赋值，然后重命名
        let durX = moveX - dragState.startX;
        let durY = moveY - dragState.startY;

        focusData.value.focus.forEach((block: { top: number, left: number }, idx: number) => {
            block.top = dragState.startPos[idx].top + durY;
            block.left = dragState.startPos[idx].left + durX;
        })
    }
    const mouseup = (e: any) => {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
    }
    return {mousedown};
}