import { h } from 'preact';
import { Bug, Carret, Close, Code, Desktop } from '../index';

import * as SVG from '../index';
import { render, fireEvent, screen } from '@testing-library/preact';
type ComponentsNames = keyof typeof SVG

describe('SVG', () => {
    test('Props', () => {
      Object.keys(SVG).forEach(key => {
        const Icon = SVG[key as ComponentsNames];
        const size = '120px'
        const className = 'custon-class';
        const fill = 'red'
        const { container } = render(<Icon size={size} className={className} fill={fill}/>);
        expect(container.firstElementChild.getAttribute('width')).toBe(size);
        expect(container.firstElementChild.getAttribute('height')).toBe(size);
        expect(container.firstElementChild.getAttribute('class')).toBe(className);
        expect(container.firstElementChild.getAttribute('style')).toBe(`fill: ${fill};`);
      })
    });

    test('Default', () => {
      Object.keys(SVG).forEach(key => {
        const Icon = SVG[key as ComponentsNames];
        const { container } = render(<Icon/>);
        expect(container.firstElementChild.getAttribute('width')).toBe('1em');
        expect(container.firstElementChild.getAttribute('height')).toBe('1em');
        expect(container.firstElementChild.getAttribute('class')).toBe('');
        expect(container.firstElementChild.getAttribute('style')).toBe(`fill: #fff;`);
      })
    });
});
