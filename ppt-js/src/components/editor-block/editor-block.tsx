import {computed, defineComponent, inject, onMounted, provide, ref, StyleValue} from "vue";
import "./editor-block.less"
import {registerConfigType} from "@/utils/editor-config";


class blockType {
    top!: number;
    left!: number;
    zIndex!: number;
    key!: string;
    alignCenter?: boolean;   //这个属性可以存在，也可以不存在
}

/*class blockTypeArray {
    [str: string]: blockType
}*/


export default defineComponent({
    props: {
        block: {type: blockType}
    },

    setup(props) {
        const blockStyles = computed(() => ({
            top: `${props.block?.top}px`,
            left: `${props.block?.left}px`,
            zIndex: `${props.block?.zIndex}px`
        }))
        const config: registerConfigType | undefined = inject('config');
        // console.log(config);
        const blockRef = ref(null);

        onMounted(() => {
            // blockRef.value
            let {offsetWidth, offsetHeight} = blockRef.value!;
            if (props.block?.alignCenter) {  //如果为真，说明是拖拽松手的时候才渲染的，其他默认渲染到页面上的内容不需要居中
                props.block.left = props.block.left - offsetWidth / 2;
                props.block.top = props.block.top - offsetHeight / 2;

                props.block.alignCenter = false;
            }
        })

        return () => {
            //通过block的key属性，直接获取对应的组件
            const component = config!.componentMap[props.block?.key!]
            //获取render函数
            const RenderComponent = component.render();
            return <div class="editor-block" style={blockStyles.value as StyleValue} ref={blockRef}>
                {RenderComponent}
            </div>
        }
    }
})