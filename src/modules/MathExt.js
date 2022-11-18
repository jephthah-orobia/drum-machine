/***
 * All script on this module is written by Jephthah M. Orobia (c) 2022
 */


class Primes {
    constructor(n) {
        let cursor = -1;

        this.next = () => {
            cursor++;
            this.getNthPrime(cursor);
        }

        this.prev = () => {
            cursor--;
            this.getNthPrime(cursor);
        }

        this.reset = () => {
            cursor = -1;
        }

        this.getNthPrime(n);

        return this;
    }

    getNthPrime = (n) => {
        const generatePrimes = (next) => {
            let hasDivisor = false;
            for (let i = 0; this.all[i] <= Math.sqrt(next); i++)
                if (next % this.all[i] === 0) {
                    hasDivisor = true;
                    break;
                }
            if (hasDivisor) return generatePrimes(next + 2);
            else this.all.push(next);
        }

        if (this.all.length > n && n >= 0)
            return this.all[n];
        else {
            while (this.all.length + 5 <= n + 1) {
                generatePrimes(this.all[this.all.length - 1] + 2);
            }
            return this.all[n];
        }
    }

    all = [2, 3];
}

export const primes = new Primes(200);

export function PrimeFactorize(n) {
    primes.reset();
    const powers = {};
    let p = primes.next();
    while (n > 1) {
        while (n % p === 0) {
            if (p in powers)
                powers[p]++;
            else
                powers[p] = 1;
            n = n / p;
        }
        p = primes.next();
    }
    const pf = [];
    for (let p in powers)
        pf.push([p, powers[p]]);
    return pf;
}

export function LCM(...arg) {
    const pfs = arg.map(n => PrimeFactorize(n));
    const maxpow = {};
    for (let pf of pfs)
        for (let p of pf)
            if (!(p[0] in maxpow) || p[0] > maxpow[p[0]])
                maxpow[p[0]] = p[1];
    let product = 1;
    for (let p in maxpow)
        product *= Math.pow(p, maxpow[p]);
    return product;
}

export function GetDivisors(n) {
    const divs = [[1, n]];
    for (let a = 2; a <= Math.sqrt(n); a++)
        if (n % a === 0) divs.push([a, n / a]);
    return divs;
}