let BlockEmbed = Quill.import('blots/block/embed');

class FigureBlot extends BlockEmbed {
    static create(data) {
        let node = super.create();
        node.innerHTML = '<img src="'+ data.src +'" width="'+ data.width +'" height="'+ data.height +'" />';
        node.setAttribute('contenteditable', false);
        return node;
    }

    deleteAt() {return false};
    formatAt() {return false};
    insertAt() {return false};
}

FigureBlot.blotName = 'figure';
FigureBlot.tagName = 'figure';

Quill.register(FigureBlot);