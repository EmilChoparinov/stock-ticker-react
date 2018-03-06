export interface DatePlot {
    x: Date;
    y: number;
}

export class DatePlot implements DatePlot {
    x: Date;
    y: number;
    constructor(x: string, y: number) {
        this.x = new Date(x);
        this.y = y;
    }
}