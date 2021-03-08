import React from "react";
import { styled } from 'baseui';

export const Svg = styled('svg', ({ $theme }) => ({
    fill: $theme.colors.primaryA,
}));

export const Par = styled('p', ({ $theme }) => ({
    padding: '2px',
}));

export const Txt = styled('text', ({ $theme }) => ({
    fontSize: '12px',
    color: $theme.colors.primary,
    ...$theme.typography.font150,
}));

export function StqRoboIcon() {

    return (
        <Par>
            <Svg
                xmlns='http://www.w3.org/2000/svg'
                width='28'
                height='33'
                version='1'
                viewBox='0 0 164 184'
            >
                <path
                    d='M52 1824c-30-21-52-66-52-107 0-58 64-117 127-117 21 0 46-19 109-81 56-56 91-83 114-88l32-6-60-47C143 1237 56 1069 15 785c-25-171-31-156 88-208 133-58 266-100 407-129 99-20 144-23 325-22 179 0 226 3 315 23 132 28 285 79 401 132l89 42v67c0 137-45 305-122 452-32 62-64 105-128 169-47 47-96 93-110 102l-25 16h30c25 1 48 18 119 90 49 50 94 88 98 84 20-11 79 9 108 38 25 26 30 38 30 81 0 44-4 54-34 84-28 28-42 34-75 34-23 0-55-7-70-15-33-17-65-77-58-110 3-19-14-41-85-112-72-72-88-93-88-118 0-17 6-37 13-44 6-6-26 6-73 28-120 56-187 72-330 78-152 7-249-13-374-77-44-22-74-34-68-28 7 7 12 27 12 45 0 27-13 44-85 114-74 71-85 87-85 116 0 74-48 123-120 123-25 0-56-7-68-16zm516-700c57-46 84-106 80-179-7-119-79-198-180-198-29 0-67 7-83 16-144 75-138 315 10 383 49 23 128 13 173-22zm670 0c20-17 47-50 60-75 31-58 27-158-8-214-55-90-171-117-252-59-128 90-112 306 27 370 49 23 128 13 173-22z'
                    transform='matrix(.1 0 0 -.1 0 184)'
                ></path>
                <path
                    d='M0 432c0-11 14-46 31-80C94 225 245 122 483 44 585 10 607 6 732 2c391-13 741 135 862 363 25 46 35 91 19 83-184-94-329-149-493-184-132-29-467-26-610 4-138 30-318 91-418 141-45 23-84 41-87 41s-5-8-5-18z'
                    transform='matrix(.1 0 0 -.1 0 184)'
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