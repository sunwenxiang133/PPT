import {defineComponent, inject, ref} from "vue";
import {registerConfigType, editorProcess} from "@/utils/editor-config";
import "./editor-left.less"
import {useMenuDragger} from "@/views/editor-left/useMenuDragger";

// import {dataType} from "@/layout/Layout/Layout";

type blockType = {
    top: number;
    left: number;
    zIndex: number;
    key: string;
    focus?: boolean;
}

class blockTypeArray {
    [str: string]: blockType
}

//根据注册列表，渲染对应功能，可以实现h5的拖拽

export default defineComponent({
    props: {
        containerRef: ref<any>(null),
        blocks: {type: blockTypeArray},
    },
    setup(props) {
        const config: registerConfigType | undefined = inject("config");

        // 1.实现菜单的拖拽功能
        const {dragstart, dragend} = useMenuDragger(props.containerRef, props.blocks);
        // 2.实现获取焦点


        /*const clearBlockFocus = () => {
            // @ts-ignore
            props.blocks?.value.forEach(block => block.focus = false);
            console.log("样式更改", props.blocks!.value);
        }

        const blockMousedown = (e: any, block: blockType) => {
            e.preventDefault();
            e.stopPropagation();
            if (block.focus) {
                clearBlockFocus();
                block.focus = true; //清空其他人的focus属性
            } else {
                block.focus = false;
            }
        }*/


        return () => {
            // return <div class="editor-left-item"></div>
            return <div class="editor-left">
                {config!.componentList.map(component => (
                    <div
                        class="editor-left-item"
                        draggable
                        onDragstart={e => dragstart(e, component)}
                        onDragend={dragend}
                    >
                        <span>{component.label}</span>
                        <div>{component.preview()}</div>
                    </div>
                ))}
            </div>
        }
    }
})