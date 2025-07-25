import moment from "jalali-moment";
import { ICompany } from "./interface";
import { selectedCompany, setSelectedCompany } from "./signals";

export class objectStorage<T extends object> {
  private key: string
  constructor(key: string) {
    this.key = key
  }
  get() {
    let d = localStorage.getItem(this.key);
    if (d === null) return null;
    return JSON.parse(d) as T;
  }
  save(object: T | ((prev: T | null) => T)) {
    if (typeof object === "function") {
      object = object(this.get())
    }
    localStorage.setItem(this.key, JSON.stringify(object));
  }
  clear() {
    localStorage.removeItem(this.key);
  }
}

export class arrayStorage<T extends object> {
  private key: string
  private data: Set<T> = new Set()
  constructor(key: string) {
    this.key = key
    this.data = this.loadData()
  }
  loadData():Set<T> {
    let s = localStorage.getItem(this.key)
    return new Set(s ? JSON.parse(s) : [])
  }
  saveData() {
    localStorage.setItem(this.key, JSON.stringify(Array.from(this.data)))
  }
  add(item: T) {
    this.data.add(item)
    this.saveData()
  }
  remove(item: T) {
    this.data.delete(item)
    this.saveData()
  }
  clear() {
    this.data = new Set()
    this.saveData()
  }
  getAll():Set<T> {
    return new Set(this.data)
  }
}


export async function copyToClipboard(text: string): Promise<void> {
    if (!navigator.clipboard) {
        // Fallback for browsers that do not support the Clipboard API
        fallbackCopyTextToClipboard(text);
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        console.error('Failed to copy text to clipboard:', err);
        // Fallback in case of error
        fallbackCopyTextToClipboard(text);
    }
}

function fallbackCopyTextToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            console.log('Fallback: Text copied to clipboard successfully!');
        } else {
            console.error('Fallback: Failed to copy text to clipboard.');
        }
    } catch (err) {
        console.error('Fallback: Error copying text to clipboard:', err);
    }
    
    document.body.removeChild(textArea);
}

export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>) {
      if (timeoutId) {
          clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
          func(...args);
      }, delay);
  };
}
type func = () => void
export class CallbackStore {
  private yes: func | null = null
  private no: func | null = null
  setYes(callback: ()=>void) {
    this.yes = callback
  }
  setNo(callback: ()=>void) {
    this.no = callback
  }
  callYes() {
    this.yes && this.yes()
    this.clear()
  }
  callNo() {
    this.no && this.no()
    this.clear()
  }
  private clear() {
    this.yes = null
    this.no = null
  }
}
export class Stack<T> {
  private items: T[] = [];

  constructor() {}

  push(element: T): void {
    this.items.push(element);
  }

  pop(): T | string {
    if (this.isEmpty()) {
      return "Underflow"; // Or throw an error
    }
    return this.items.pop()!; // Use ! to assert that the value is not null/undefined
  }

  peek(): T | string {
    if (this.isEmpty()) {
      return "Empty Stack"; // Or throw an error
    }
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  printStack(): string {
    let str: string = "";
    for (let i = 0; i < this.items.length; i++) {
      str += this.items[i] + " ";
    }
    return str;
  }
}


export function getAuthUrl() {

  let oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  let params = {
    'client_id': import.meta.env.VITE_GOOGLE_CLIENTID || "",
    'redirect_uri': import.meta.env.VITE_APPLICATION + '/googleRedirect',
    'response_type': 'token',
    'prompt': 'consent',
    'scope': 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
  };

  const url = new URL(oauth2Endpoint);
  Object.entries(params).forEach(k => url.searchParams.append(k[0], k[1]));
  return url;
}
 

export const retriveSelectedCompany = () => {
  let string = localStorage.getItem("selectedCompany")
  if (!string) return
  let obj = JSON.parse(string)

  setSelectedCompany(obj as ICompany)
}

export function formatNumber(n:number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function faDateToISO(faDate: string): string {
  const [year, month, day] = faDate.split('/');
  const gregorianDate = moment.from(year, month, day);
  gregorianDate.set({ hour: 14, minute: 15, second: 22, millisecond: 0 });
  return gregorianDate.toISOString();
}

export function ISODateToFa(isoDate: string) {
  return moment(isoDate).locale("fa").format("YYYY/MM/DD")
}

export const generateShareLink = (token: string) => `${import.meta.env.VITE_APPLICATION}/Invoice/View/${token}`

export function formatToPersianShortDate(isoDate: string) {
  const date = new Date(isoDate)
  const formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  const parts = formatter.formatToParts(date)

  const year = parts.find(p => p.type === 'year')?.value
  const month = parts.find(p => p.type === 'month')?.value
  const day = parts.find(p => p.type === 'day')?.value

  return `${year}/${month}/${day}`
}

export const logoName2url = (name: string, id:number) => `${import.meta.env.VITE_API}/logos/${id}/${name}?date=${Date.now()}`
