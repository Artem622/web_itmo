import ApiResolver from "@/api/apiResolver";

export class createModel extends ApiResolver {
    constructor() {
        super('create');
    }

    async sendCreate(data) {
        return await this.request('', 'POST', data)
            .then(res => {
                console.log(res)
            })
    }
}