var registerBlockType = wp.blocks.registerBlockType;
var el = wp.element.createElement

var BlockControls = wp.editor.BlockControls
var InspectorControls = wp.editor.InspectorControls
var SelectControl = wp.components.SelectControl
var RadioControl = wp.components.RadioControl
var MediaUpload = wp.editor.MediaUpload
  var RichText = wp.editor.RichText

var values = [{ label: '-- Select a Page --', value: '' }];
var postsCollection = new wp.api.collections.Pages();
postsCollection.fetch({
    success:function(sucess){
        var allpages = postsCollection.models;
        for (var i = 0; i < allpages.length; i++) {
            values.push({
                label: allpages[i].attributes.title.rendered,
                value: allpages[i].attributes.id
            })
        }
        values.push(
            {
                label: '',
                value: ''
            },
            {
                label: 'External Link',
                value: 'externalLink'
            }
        )
    }
});

registerBlockType('lp/block', {
    title: 'List Pages',
    description: 'A custom block for listing all pages.',
    icon: 'id',
    category: 'layout',
    attributes: {
        title: {
          type: 'array',
          source: 'children',
          selector: 'h3'
        },
        bio: {
          type: 'array',
          source: 'children',
          selector: 'p'
        },
        mediaID: {
          type: 'number'
        },
        mediaURL: {
          type: 'string',
          source: 'attribute',
          selector: 'img',
          attribute: 'src'
        },
        externalLinkDisplay: {
          type: 'string',
          default: 'hidden'
        },
        externalLink: {
          type: 'url'
        },
        selectedPost: {
          type: 'number',
          default: 0,
       },
       buttonText: {
         type: 'array',
         source: 'children',
         selector: 'p',
         default: 'Read More'
       },
    },

    edit: function(props){

        var onSelectImage = function (media) {
          return props.setAttributes({
            mediaURL: media.url,
            mediaID: media.id
          })
        }

        function showLink(value) {
            console.log(value);
            if(value === 'externalLink'){
                props.setAttributes({ externalLinkDisplay: 'show' })
            } else {
                props.setAttributes({ externalLinkDisplay: 'hidden' })
            }
        }

        return [
            el(BlockControls, { key: 'controls' }, // Display controls when the block is clicked on.
              el('div', { className: 'components-toolbar' },
                el(MediaUpload, {
                  onSelect: onSelectImage,
                  type: 'image',
                  render: function (obj) {
                    return el(wp.components.Button, {
                      className: 'components-icon-button components-toolbar__control',
                      onClick: obj.open
                    },
                    // Add Dashicon for media upload button.
                    el('svg', { className: 'dashicon dashicons-edit', width: '20', height: '20' },
                      el('path', { d: 'M2.25 1h15.5c.69 0 1.25.56 1.25 1.25v15.5c0 .69-.56 1.25-1.25 1.25H2.25C1.56 19 1 18.44 1 17.75V2.25C1 1.56 1.56 1 2.25 1zM17 17V3H3v14h14zM10 6c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm3 5s0-6 3-6v10c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V8c2 0 3 4 3 4s1-3 3-3 3 2 3 2z' })
                    ))
                  }
                })
              )
            ),
            el(InspectorControls, { key: 'inspector' },
                el(wp.components.PanelBody, {
                      title: 'Block setting',
                      className: 'block-button-settings',
                      initialOpen: true
                    },
                    el('p', {}, 'Change the settings for your content block.'),
                    el(SelectControl, {
                        label:"Select a Page",
                        options: values,
                        onChange: showLink
                    }),
                    el(TextControl, {
                      type: 'url',
                      label: 'External Link URL',
                      className: props.attributes.externalLinkDisplay,
                      value: props.attributes.externalLink,
                      onChange: function (newFacebook) {
                        props.setAttributes({ externalLink: newFacebook })
                      }
                    }),
                    el(TextControl, {
                      type: 'text',
                      label: 'Button Text',
                      value: props.attributes.buttonText,
                      onChange: function (newText) {
                        props.setAttributes({ buttonText: newText })
                      }
                    }),
                )
            ),
            el('div', { className: props.className },
                el('div', {
                  className: props.attributes.mediaID ? 'alt-section-image image-active' : 'alt-section-image image-inactive',
                  style: props.attributes.mediaID ? { backgroundImage: 'url(' + props.attributes.mediaURL + ')' } : {}
                },
                el(MediaUpload, {
                  onSelect: onSelectImage,
                  type: 'image',
                  value: props.attributes.mediaID,
                  render: function (obj) {
                    return el(wp.components.Button, {
                      className: props.attributes.mediaID ? 'image-button' : 'button button-large',
                      onClick: obj.open
                    },
                    !props.attributes.mediaID ? 'Upload Image' : el('img', { src: props.attributes.mediaURL })
                    )
                  }
                })
                ),
                el('div', { className: 'alt-section-content', style: { } },
                    el(RichText, {
                      key: 'editable',
                      tagName: 'h3',
                      placeholder: 'Section Title',
                      keepPlaceholderOnFocus: true,
                      value: props.attributes.title,
                      onChange: function (newTitle) {
                        props.setAttributes({ title: newTitle })
                      }
                    }),
                    el(RichText, {
                      key: 'editable',
                      tagName: 'p',
                      placeholder: 'Write a description about the section',
                      keepPlaceholderOnFocus: true,
                      value: props.attributes.bio,
                      onChange: function (newBio) {
                        props.setAttributes({ bio: newBio })
                      }
                    }),
                    el('div', { className: 'organic-profile-social' },
                        props.attributes.externalLink && el('a', {
                          className: 'social-link',
                          href: props.attributes.externalLink,
                          target: '_blank'
                        },
                        el('i', { className: 'fab fa-facebook' })
                        ),
                    )
                )
            )
        ]
    },

    save: function(props){

    }
})
