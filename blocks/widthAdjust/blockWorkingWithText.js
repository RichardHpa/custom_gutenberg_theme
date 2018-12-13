var registerBlockType = wp.blocks.registerBlockType;
var el = wp.element.createElement


var BlockControls = wp.editor.BlockControls
var InspectorControls = wp.editor.InspectorControls
var AlignmentToolbar = wp.editor.AlignmentToolbar
var TextControl = wp.components.TextControl
var RadioControl = wp.components.RadioControl
var InnerBlocks = wp.components.InnerBlocks

registerBlockType('wa/block', {
    title: 'Content Container',
    description: 'A custom block for changing between full and fixed width content.',
    icon: 'leftright',
    category: 'layout',
    attributes: {
        content: {
            type: 'array',
            source: 'children',
            selector: 'p',
        },
        alignment: {
          type: 'string',
          default: 'center'
        },
        facebookURL: {
          type: 'url'
        },
        blockWidth: {
          type: 'string',
          default: 'fixed'
        },
    },

    edit: function(props){

        function onChangeAlignment (newAlignment) {
          props.setAttributes({ alignment: newAlignment })
        }

        if(props.attributes.blockWidth === 'full'){
            var margins = '-33.33%';
            var containerClass = 'container-fluid'
        } else {
            var margins = '0';
            var containerClass = 'container'
        }

        return [
            el(BlockControls, { key: 'controls' },
                el('div', { className: 'components-toolbar' },

                ),
                el(AlignmentToolbar, {
                  value: props.attributes.alignment,
                  onChange: onChangeAlignment
              }),
            ),
            el(InspectorControls, { key: 'inspector' },
                el(wp.components.PanelBody, {
                      title: 'Block setting',
                      className: 'block-social-links',
                      initialOpen: true
                    },
                    el('p', {}, 'Change the settings for your content block.'),
                    el(TextControl, {
                      type: 'url',
                      label: 'Facebook URL',
                      value: props.attributes.facebookURL,
                      onChange: function (newFacebook) {
                        props.setAttributes({ facebookURL: newFacebook })
                      }
                    }),
                    el(RadioControl, {
                        selected:props.attributes.blockWidth,
                        options: [
                            { label: 'Fixed With', value: 'fixed' },
                            { label: 'Full Width', value: 'full' },
                        ], onChange: function(newWidth){
                            props.setAttributes({blockWidth: newWidth})
                        }
                    })
                )
            ),
            el('div', { className: containerClass, style: {marginLeft: margins, marginRight: margins} },
                el('div', { className: 'adjust-width', style: { textAlign: props.attributes.alignment  } },
                    el(wp.editor.RichText, {
                        tagName: 'p',
                        className: props.className,
                        value: props.attributes.content,
                        onChange: function(newContent){
                            props.setAttributes({content: newContent})
                        }
                    } )
                )
            )

        ]
    },

    save: function(props){
        if(props.attributes.blockWidth === 'full'){
            var margins = '-33.33%';
            var containerClass = 'container-fluid'
        } else {
            var margins = '0';
            var containerClass = 'container'
        }
        return(
            el('div', { className: containerClass, style: {} },
                el('div', { className: 'adjust-width', style: { textAlign: props.attributes.alignment  } },
                    el('p', {
                        className: props.className,
                    }, props.attributes.content)
                )
            )
        )
    }
})
