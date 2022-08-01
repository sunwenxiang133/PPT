import {editorProcess} from "@/utils/editor-config";

export function useMenuDragger(containerRef: any, blocks: any) {
    let currentComponent: any = null;
    const dragenter = (e: any) => {
        e.dataTransfer.dropEffect = 'move'  //h5拖动的图标
        console.log('dragenter');
    }
    const dragover = (e: any) => {
        e.preventDefault();
        console.log('dragover');
        console.log('高', e.offsetY);
        console.log('水平', e.offsetX);
    }
    const dragleave = (e: any) => {
        e.dataTransfer.dropEffect = 'none'

        console.log('dragleave');
    }
    const drop = (e: any) => {
        console.log("currentComponent", currentComponent);
        console.log(e.offsetY, e.offsetX);
        // @ts-ignore
        blocks!.push({
            top: e.offsetY,
            left: e.offsetX,
            zIndex: 1,
            key: currentComponent.key,
            alignCenter: true //松手的时候可以居中
        })
        currentComponent = null;
    }


    const dragstart = (e: any, component: editorProcess) => {
        //dragenter进入元素中，添加一个移动的标识
        //dragover在目标元素经过，必须要阻止默认行为，否则不能触发drop
        //dragleave 离开元素的时候，需要增加一个禁用标识
        //drop松手的时候，根据拖拽的组件，添加一个组件
        containerRef.value.addEventListener('dragenter', dragenter)
        containerRef.value.addEventListener('dragover', dragover)
        containerRef.value.addEventListener('dragleave', dragleave)
        containerRef.value.addEventListener('drop', drop)
        currentComponent = component;
    }

    const dragend = (e: any) => {
        containerRef.value.removeEventListener('dragenter', dragenter)
        containerRef.value.removeEventListener('dragover', dragover)
        containerRef.value.removeEventListener('dragleave', dragleave)
        containerRef.value.removeEventListener('drop', drop)
        console.log('清除注册事件');
    }
    return {
        dragstart, dragend,
    }
}