//列表区可以显示所有的物料
//key对应的组件的映射关系


//组件一定存在的东西
export interface editorProcess {
    key: string;
    label: string;
    preview: Function;
    render: Function;
}

type editorType<T extends editorProcess> = (component: T) => {}

type MapType = {
    [key: string]: any;  //算是自定义的映射类型
    // [index: number]: any;
};


function createEditorConfig() {
    const componentList = [] as Array<object>;
    const componentMap = {} as MapType;


    return {
        componentMap,
        componentList,
        register: function (component) {
            componentList.push(component);
            componentMap[component.key] = component;
        } as editorType<any>,
    }
}

/*class editorProcessClass implements editorProcess {
    key!: string;
    label!: string;

    preview() {
    }

    render() {
    }
}*/


export type registerConfigType = {
    componentList: Array<editorProcess>;
    componentMap: MapType;
    register: editorType<any>;
}

export let registerConfig = createEditorConfig();
console.log("测试一下", registerConfig);

registerConfig.register({
    label: '文本',
    preview: () => '预览文本',
    render: () => '渲染文本',
    key: 'text'
})
registerConfig.register({
    label: '按钮',
    preview: () => <a-button>渲染按钮</a-button>,
    render: () => <a-button>渲染按钮</a-button>,
    key: 'button'
})
registerConfig.register({
    label: '输入框',
    preview: () => <a-input placeholder="预览输入框"></a-input>,
    render: () => <a-input placeholder="预览输入框"></a-input>,
    key: 'input'
})