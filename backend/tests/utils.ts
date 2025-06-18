declare global{
    interface String{
        cleanCSV(): string;
    }
}

String.prototype.cleanCSV = function (): string {
    return this.trim().split('\n').map(line => line.trim()).join('\n');
};

export{};

