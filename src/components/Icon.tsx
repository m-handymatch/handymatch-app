import Svg, { Circle, Path, Rect } from 'react-native-svg';

export type IconName =
  | 'wrench' | 'tv' | 'drywall' | 'sofa' | 'garage' | 'appliance'
  | 'home' | 'list' | 'user' | 'inbox' | 'card' | 'sliders'
  | 'back' | 'close' | 'chevron' | 'check' | 'pin' | 'phone' | 'message'
  | 'shield' | 'camera' | 'plus' | 'info';

type Props = { name: IconName; size?: number; color?: string; strokeWidth?: number };

export function Icon({ name, size = 24, color = '#17211F', strokeWidth = 2 }: Props) {
  const p = { stroke: color, strokeWidth, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessible={false}>
      {shapes(name, p)}
    </Svg>
  );
}

function shapes(name: IconName, p: object) {
  switch (name) {
    case 'wrench': return <Path {...p} d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.8-.7-.7-2.8z" />;
    case 'tv': return <><Rect {...p} x={2} y={4} width={20} height={13} rx={2} /><Path {...p} d="M8 21h8M12 17v4" /></>;
    case 'drywall': return <><Rect {...p} x={3} y={3} width={18} height={18} rx={2} /><Path {...p} d="M9 9l2 3-2 3M15 9l-2 3 2 3" /></>;
    case 'sofa': return <Path {...p} d="M4 10h16v8H4zM6 18v3M18 18v3M6 10V6h12v4" />;
    case 'garage': return <><Path {...p} d="M3 21V9l9-6 9 6v12" /><Path {...p} d="M7 21v-9h10v9M7 15h10M7 18h10" /></>;
    case 'appliance': return <><Rect {...p} x={5} y={2} width={14} height={20} rx={2} /><Path {...p} d="M5 8h14M9 5h1" /><Circle {...p} cx={12} cy={15} r={3} /></>;
    case 'home': return <Path {...p} d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z" />;
    case 'list': return <Path {...p} d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />;
    case 'user': return <><Circle {...p} cx={12} cy={8} r={4} /><Path {...p} d="M4 21a8 8 0 0116 0" /></>;
    case 'inbox': return <><Path {...p} d="M22 12h-6l-2 3h-4l-2-3H2" /><Path {...p} d="M5.5 5.1L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.5-6.9A2 2 0 0016.8 4H7.2a2 2 0 00-1.7 1.1z" /></>;
    case 'card': return <><Rect {...p} x={2} y={5} width={20} height={14} rx={2} /><Path {...p} d="M2 10h20" /></>;
    case 'sliders': return <Path {...p} d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />;
    case 'back': return <Path {...p} d="M15 18l-6-6 6-6" />;
    case 'close': return <Path {...p} d="M18 6L6 18M6 6l12 12" />;
    case 'chevron': return <Path {...p} d="M9 6l6 6-6 6" />;
    case 'check': return <Path {...p} d="M20 6L9 17l-5-5" />;
    case 'pin': return <><Path {...p} d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" /><Circle {...p} cx={12} cy={9.5} r={2.5} /></>;
    case 'phone': return <Path {...p} d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z" />;
    case 'message': return <Path {...p} d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />;
    case 'shield': return <><Path {...p} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><Path {...p} d="M9 12l2 2 4-4" /></>;
    case 'camera': return <><Path {...p} d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><Circle {...p} cx={12} cy={13} r={4} /></>;
    case 'plus': return <Path {...p} d="M12 5v14M5 12h14" />;
    case 'info': return <><Circle {...p} cx={12} cy={12} r={10} /><Path {...p} d="M12 8v4M12 16h.01" /></>;
  }
}
