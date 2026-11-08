// In-memory app state with sample data. Replace with calls to your backend.
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { IconName } from './components/Icon';

export const SERVICES: { id: string; name: string; icon: IconName }[] = [
  { id: 'general', name: 'General repairs', icon: 'wrench' },
  { id: 'mounting', name: 'TV and shelf mounting', icon: 'tv' },
  { id: 'drywall', name: 'Drywall repair', icon: 'drywall' },
  { id: 'assembly', name: 'Furniture assembly', icon: 'sofa' },
  { id: 'garage', name: 'Garage door repair', icon: 'garage' },
  { id: 'appliance', name: 'Appliance repair', icon: 'appliance' },
];
export const serviceName = (id: string) => SERVICES.find((x) => x.id === id)?.name ?? 'Handyman job';

export const WHEN = ['ASAP', 'This week', 'Flexible'] as const;
export type When = (typeof WHEN)[number];

export type RequestStatus = 'Matching' | 'Matched' | 'Done';
export type HomeRequest = {
  id: string; service: string; description: string; zip: string; when: When;
  status: RequestStatus; proName?: string; proBusiness?: string; created: string;
};

export const OUTCOMES = ['Booked', 'Quoted', 'No answer'] as const;
export type Outcome = (typeof OUTCOMES)[number];
export type Lead = {
  id: string; service: string; description: string; zip: string; when: When;
  firstName: string; price: number; received: string; outcome: Outcome | null; credited?: boolean;
};

export type Txn = { id: string; label: string; date: string; amount: number };

type Store = {
  requests: HomeRequest[];
  addRequest: (r: Omit<HomeRequest, 'id' | 'status' | 'created'>) => HomeRequest;
  leads: Lead[];
  setOutcome: (id: string, o: Outcome) => void;
  creditLead: (id: string) => void;
  receiving: boolean;
  setReceiving: (v: boolean) => void;
  txns: Txn[];
  addFunds: (amount: number) => void;
  weeklyBudget: string;
  setWeeklyBudget: (v: string) => void;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<HomeRequest[]>([
    { id: 'r3', service: 'mounting', description: 'Mount a TV and two shelves in the living room', zip: '[ZIP]', when: 'ASAP', status: 'Matched', proName: '[PRO NAME]', proBusiness: '[BUSINESS NAME]', created: 'Today' },
    { id: 'r2', service: 'drywall', description: 'Patch two holes in the hallway', zip: '[ZIP]', when: 'This week', status: 'Matching', created: 'Today' },
    { id: 'r1', service: 'assembly', description: 'Assemble a bed frame', zip: '[ZIP]', when: 'Flexible', status: 'Done', proName: '[PRO NAME]', proBusiness: '[BUSINESS NAME]', created: '[DATE]' },
  ]);
  const [leads, setLeads] = useState<Lead[]>([
    { id: 'l3', service: 'mounting', description: '[Job description from the homeowner]', zip: '[ZIP]', when: 'ASAP', firstName: '[FIRST NAME]', price: 35, received: 'Just now', outcome: null },
    { id: 'l2', service: 'drywall', description: '[Job description]', zip: '[ZIP]', when: 'This week', firstName: '[FIRST NAME]', price: 50, received: '[TIME]', outcome: 'Booked' },
    { id: 'l1', service: 'general', description: '[Job description]', zip: '[ZIP]', when: 'Flexible', firstName: '[FIRST NAME]', price: 35, received: '[TIME]', outcome: 'No answer', credited: true },
  ]);
  const [txns, setTxns] = useState<Txn[]>([
    { id: 't3', label: 'Live call · drywall', date: '[DATE]', amount: -50 },
    { id: 't2', label: 'Auto credit · unreachable', date: '[DATE]', amount: 35 },
    { id: 't1', label: 'Funds added', date: '[DATE]', amount: 200 },
  ]);
  const [receiving, setReceiving] = useState(true);
  const [weeklyBudget, setWeeklyBudget] = useState('');

  const store: Store = {
    requests,
    addRequest: (r) => {
      // Matching happens on the server; here the request is matched immediately for the demo.
      const req: HomeRequest = { ...r, id: `r${Date.now()}`, status: 'Matched', proName: '[PRO NAME]', proBusiness: '[BUSINESS NAME]', created: 'Just now' };
      setRequests((xs) => [req, ...xs]);
      return req;
    },
    leads,
    setOutcome: (id, o) => setLeads((xs) => xs.map((l) => (l.id === id ? { ...l, outcome: o } : l))),
    creditLead: (id) => {
      const lead = leads.find((l) => l.id === id);
      if (!lead || lead.credited) return;
      setLeads((xs) => xs.map((l) => (l.id === id ? { ...l, credited: true } : l)));
      setTxns((xs) => [{ id: `t${Date.now()}`, label: `Credit · ${serviceName(lead.service)}`, date: 'Today', amount: lead.price }, ...xs]);
    },
    receiving,
    setReceiving,
    txns,
    addFunds: (amount) => setTxns((xs) => [{ id: `t${Date.now()}`, label: 'Funds added', date: 'Today', amount }, ...xs]),
    weeklyBudget,
    setWeeklyBudget,
  };
  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore must be used inside StoreProvider');
  return s;
}

export const money = (n: number) => `${n < 0 ? '−' : '+'}$${Math.abs(n)}`;
