var _Fields = [
// Subheadline
{
    name: 'subtitle',
    type: 'richtext',
    placement: 'left',
    classes: 'size--medium',
    event: '@blur="htmlTrim"',
    placeholder: 'Add a Subheadline...'
},

// Image size settings
{
    name: 'isnarrow',
    type: 'checkbox',
    placement: 'right',
    title: 'Image Settings',
    label: 'Use Narrow Images'
},

{
    name: 'ismedium',
    type: 'checkbox',
    placement: 'right',
    label: 'Use Medium Images'
},

// Twitter author handle
{
    name: 'twitterHandle',
    type: 'text',
    placement: 'right',
    title: 'Twitter author handle',
    placeholder: 'EG: pixelartio'
},

// Meta title
{
    name: 'metaTitle',
    type: 'richtext',
    placement: 'right',
    title: 'Meta title',
    event: '@blur="textTrim"',
    placeholder: 'Add meta title...'
},

// Meta description
{
    name: 'metaDescription',
    type: 'richtext',
    placement: 'right',
    title: 'Meta description',
    event: '@blur="textTrim"',
    placeholder: 'Add meta description...'
}
];
