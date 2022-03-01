/**
 * 
 * データをいい感じになんかしてくれるヘルパー
 * 
 */

export class DataWellHelper
{
    private static instance: DataWellHelper;
    private data           : any;
    
    public static call(data: any = null)
    {
        if (!DataWellHelper.instance) 
        {
            DataWellHelper.instance = new DataWellHelper();
        }
        if (data !== null) {
            DataWellHelper.instance.setData(data);
        }
        return DataWellHelper.instance;
    }

    public setData(data: any): DataWellHelper
    {
        this.data = data;
        return this;
    }

    public getById(id: number): any
    {
        for (const key in this.data) {
            if (Object.prototype.hasOwnProperty.call(this.data, key)) {
                if ('id' in this.data[key] && this.data[key]['id'] === id) {
                    return this.data[key];
                }
            }
        }
        return false;
    }

}
