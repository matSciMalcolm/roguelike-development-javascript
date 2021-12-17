class foo {
    constructor(name) {
        this.name = name
    }
}

a = new Set([new foo("seker"), new foo("skeleton")])

// for (let n of a.map(x => x.name)) {
//     console.log(n)
// }

console.log(a.forEach(x => x.name))
