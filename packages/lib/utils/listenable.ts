
export class Listenable {
    private _listeners: Function[] = [];

    constructor() {}

    protected dispatch() {
        (this._listeners || []).forEach(async(listener) => {
            listener?.();
        });
    }

    public addListener(listener: Function) {
        this._listeners.push(listener);
    }

    public removeListener(listener: Function) {
        const index = this._listeners.indexOf(listener);

        if (index >= 0) {
            this._listeners.splice(index, 1);
        }
    }
}
