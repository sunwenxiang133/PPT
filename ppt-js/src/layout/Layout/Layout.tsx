import {computed, defineComponent, ref} from "vue";
import "./Layout.less"
import EditorBlock from "@/components/editor-block/editor-block";
import EditorLeft from "@/views/editor-left/editor-left";

export class dataType {
    container!: {
        width: number,
        height: number,
    };
    blocks!: [
        {
            top: number,
            left: number,
            zIndex: number,
            key: string,
            focus?: boolean
        }
    ]
}


export default defineComponent({
    props: {
        modelValue: {type: dataType}
    },
    setup(props) {
        // console.log(props.modelValue);


        const data = computed({
            get() {
                return props.modelValue!
            },
            set() {
                console.log("data发生了改变", data);
            }
        });

        const containerStyles = computed(() => ({
            width: data.value.container.width + "px",
            height: data.value.container.height + "px"
        }))


        const containerRef = ref(null);

        //实现拖拽多个元素的功能
        const clearBlockFocus = () => {
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
                } else {
                    block.focus = false;
                }
            }
        }

        const containerMousedown = () => {
            clearBlockFocus();
        }

        return () => <div class="editor">
            {/*v-bind不行，因为当时没有，但是v-model可以，因为渲染完会回到原来的界面*/}
            <EditorLeft v-model:containerRef={containerRef} v-model:blocks={data.value.blocks}></EditorLeft>
            <div class="editor-top">菜单栏</div>
            <div class="editor-right">属性控制栏</div>
            <div class="editor-container">
                {/*产生滚动条*/}
                <div class="editor-container-canvas">
                    {/*产生内容区*/}
                    <div
                        class="editor-container-canvas_content"
                        ref={containerRef}
                        style={containerStyles.value}
                        onMousedown={containerMousedown}
                    >
                        {
                            (data.value.blocks.map(block => (
                                <EditorBlock
                                    block={block}
                                    // @ts-ignore
                                    onMousedown={(e: any) => blockMousedown(e, block)}
                                    class={block.focus ? 'editor-block-focus' : ''}
                                >

                                </EditorBlock>
                            )))
                        }
                    </div>
                </div>
            </div>
        </div>
    }
})