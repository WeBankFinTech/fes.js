import { generate } from './util';

const IconBase = {
    functional: true,
    props: ['icon'],
    render(h, ctx) {
        const {
            data: { attrs, ...restData } = {},
            props = {},
            listeners
        } = ctx;
        const { icon, ...restProps } = {
            ...attrs,
            ...props
        };
        if (!icon) return null;
        const target = icon;

        return generate(h, target.icon, `svg-${target.name}`, {
            ...restData,
            attrs: {
                'data-icon': target.name,
                width: '1em',
                height: '1em',
                fill: 'currentColor',
                'aria-hidden': 'true',
                ...restProps
            },
            on: listeners
        });
    }
};

IconBase.name = 'IconBase';

export default IconBase;
