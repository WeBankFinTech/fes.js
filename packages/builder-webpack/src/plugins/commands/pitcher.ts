const pitcher = (code: string): string => code;

export function pitch(this: any) {
    if (/&blockType=config/.test(this.resourceQuery)) {
        return '';
    }
}

export default pitcher;
