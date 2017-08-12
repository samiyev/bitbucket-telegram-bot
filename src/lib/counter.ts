import * as  FS from "fs";
import * as json from "jsonfile";

export class Counter {
    private reviseDatas = new Map();

    constructor(private options) {
        this.onInit();
    }

    onInit() {
        if (!this.options.path) {
            this.options.path = __dirname + '/counts.json';
        }

        if (!FS.existsSync(this.options.path)) {
            json.writeFileSync(this.options.path, []);
        }
    }

    async revise(input, count) {
        let repo = this.reviseDatas.get(input.slug);
        if (!repo) return { skip: 0, limit: count };
        return { skip: repo.count, limit: count - repo.count };
    }

    async update(input, count) {
        let repo = this.reviseDatas.get(input.slug);
        if (!repo) {
            this.reviseDatas.set(input.slug, { slug: input.slug, count: count });
        }
        else {
            repo.count += count;
        }
    }

    async open() {
        this.reviseDatas = new Map();

        let repos = json.readFileSync(this.options.path);
        for (let repo of repos) {
            this.reviseDatas.set(repo.slug, repo);
        }
    }

    async close() {
        let repos = Array.from(this.reviseDatas.values());
        json.writeFileSync(this.options.path, repos);
        this.reviseDatas = null;
        this.reviseDatas = new Map();
    }

    async reset() {
        json.writeFileSync(this.options.path, []);
    }
}