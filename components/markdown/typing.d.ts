namespace EditorType {
	interface EditorRef {
		getContent: () => import('gray-matter').GrayMatterFile<string>;
		setContent: (params: {
			content: string;
			title: string;
			description?: string;
		}) => void;
	}
}
