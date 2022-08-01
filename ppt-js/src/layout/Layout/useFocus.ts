import {computed} from "vue";


//获取哪些元素被选中了
//这里这个callback其实就相当于钩子函数
export function useFocus(data: any, props: any, callback: Function) {
    const clearBlockFocus = () => {
        // @ts-ignore
        props.modelValue?.blocks.forEach(block => block.focus = false);
    }

    function blockMousedown(e: any, block: { top: number; left: number; zIndex: number; key: string; focus?: boolean }) {
        e.preventDefault();
        e.stopPropagation();
        //block上规划一个属性focus,获取焦点后就将focus变为true
        if (e.shiftKey) {
            block.focus = !block.focus;
        } else {
            if (!block.focus) {
                clearBlockFocus();
                block.focus = true;
            } //当自己已经是选中状态，再次被的，点击的时候还是选中状态
        }
        callback(e);
    }

    const focusData = computed(() => {
        let focus = [] as any[];
        let unfocused = [] as any[];
        // @ts-ignore
        data.value.blocks.forEach(block => (block.focus ? focus : unfocused).push(block))
        return {focus, unfocused}
    })


    const containerMousedown = () => {
        clearBlockFocus();
    }
    return {
        blockMousedown, focusData, containerMousedown
    }
}