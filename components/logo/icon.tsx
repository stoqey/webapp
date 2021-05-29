import React from "react";
import { styled } from 'baseui';

export const Svg = styled('svg', ({ $theme, $gold }: any) => ({
    // fill: $theme.colors.primaryA,
    fill: $gold ? 'gold' : $theme.colors.primary,
}));

export const Par = styled('p', ({ $theme }) => ({
    padding: '2px',
}));

export const Txt = styled('text', ({ $theme, $gold }: any) => ({
    fontSize: '12px',
    color: $gold ? 'gold' : $theme.colors.primary,
    ...$theme.typography.font150,
}));

interface Props {
    gold?: boolean;
}

export function StqRoboIcon(props: Props) {
    const gold = props && props.gold || false;
    return (
        <Par>
            <Svg $gold={gold}
                xmlns='http://www.w3.org/2000/svg'
                width='35'
                height='34'
                fill='none'
                viewBox='0 0 35 34'
            >
                <path
                    strokeMiterlimit='10'
                    d='M26.382 4.137l.69-2.28a.64.64 0 00-.438-.797l-.11-.033a.65.65 0 00-.808.43l-.689 2.281a.64.64 0 00.437.797l.11.032c.344.101.706-.092.808-.43zM7.847 4.14l-.69-2.287a.636.636 0 01.434-.792l.117-.034c.342-.1.701.091.803.428l.691 2.287a.636.636 0 01-.434.792l-.118.035a.648.648 0 01-.803-.429z'
                ></path>
                <path
                    d='M30.85 3.767H3.474C.804 3.767-.865 6.619.47 8.902l6.844 11.693 6.843 11.693c1.336 2.283 4.675 2.283 6.011 0l6.843-11.693 6.844-11.693c1.336-2.283-.334-5.135-3.005-5.135zM7.13 13.9c0-1.922 1.579-3.48 3.528-3.48 1.948 0 3.528 1.558 3.528 3.48 0 1.923-1.58 3.481-3.528 3.481-1.949 0-3.529-1.559-3.529-3.48zm16.746 7.812L21.91 25.07a.648.648 0 01-.566.322.657.657 0 01-.61-.423l-1.421-2.427-1.762 2.484-.008.011a.659.659 0 01-1.118-.02l-1.495-2.555-1.683 2.372a.67.67 0 01-.018.025.656.656 0 01-1.12-.016l-1.965-3.357a.64.64 0 01.24-.88.658.658 0 01.891.236l1.452 2.48 1.704-2.402a.66.66 0 01.976-.105.646.646 0 01.185.2l1.452 2.482 1.69-2.386a.584.584 0 01.04-.048.659.659 0 011.155-.047l1.424 2.434 1.393-2.381a.658.658 0 01.891-.236.64.64 0 01.239.88zm-.209-4.331c-1.948 0-3.528-1.559-3.528-3.481s1.58-3.48 3.528-3.48c1.949 0 3.529 1.558 3.529 3.48s-1.58 3.48-3.529 3.48z'
                ></path>
            </Svg>
        </Par>
    );
}

export function StoqeyWordsLogo() {

    return (
        <Par>
            <Svg
                xmlns='http://www.w3.org/2000/svg'
                version='1'
                viewBox='0 0 100 11'
                height="auto"
                width="auto"
            >
                <Txt x="2" y="10">STOQEY</Txt>
            </Svg>
        </Par>

    );
}

export default StqRoboIcon;