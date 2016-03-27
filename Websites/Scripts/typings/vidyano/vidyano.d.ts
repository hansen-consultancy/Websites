// Typing for linq.js, ver 3.0.3-Beta4

declare module linqjs {
    interface IEnumerator<T> {
        current(): T;
        moveNext(): Boolean;
        dispose(): void;
    }

    interface EnumerableStatic {
        Utils: {
            createLambda<T>(expression: T): (...params: T[]) => T;
            createEnumerable<T>(getEnumerator: () => IEnumerator<T>): Enumerable<T>;
            createEnumerator<T>(initialize: () => void, tryGetNext: () => Boolean, dispose: () => void): IEnumerator<T>;
            extendTo<T>(type: T): void;
        };
        choice<T>(...params: T[]): Enumerable<T>;
        cycle<T>(...params: T[]): Enumerable<T>;
        empty<T>(): Enumerable<T>;
        from<T>(): Enumerable<T>;
        from<T>(obj: Enumerable<T>): Enumerable<T>;
        from(obj: string): Enumerable<string>;
        from(obj: number): Enumerable<number>;
        from<T>(obj: { length: number;[x: number]: T; }): Enumerable<T>;
        from<T>(obj: T): Enumerable<T>;
        make<T>(element: T): Enumerable<T>;
        matches<T>(input: string, pattern: RegExp): Enumerable<T>;
        matches<T>(input: string, pattern: string, flags?: string): Enumerable<T>;
        range(start: number, count: number, step?: number): Enumerable<number>;
        rangeDown(start: number, count: number, step?: number): Enumerable<number>;
        rangeTo(start: number, to: number, step?: number): Enumerable<number>;
        repeat<T>(element: T, count?: number): Enumerable<T>;
        repeatWithFinalize<T>(initializer: () => T, finalizer: (element) => void): Enumerable<T>;
        generate<T>(func: () => T, count?: number): Enumerable<T>;
        toInfinity<T>(start?: number, step?: number): Enumerable<T>;
        toNegativeInfinity<T>(start?: number, step?: number): Enumerable<T>;
        unfold<T>(seed: T, func: (value: T) => T): Enumerable<T>;
        defer<T>(enumerableFactory: () => Enumerable<T>): Enumerable<T>;
    }

    interface Enumerable<T> {
        constructor(getEnumerator: () => IEnumerator<T>);
        getEnumerator(): IEnumerator<T>;

        // Extension Methods
        traverseBreadthFirst(func: (element: T) => Enumerable<T>, resultSelector?: (element: T, nestLevel: number) => T): Enumerable<T>;
        traverseDepthFirst(func: (element: T) => Enumerable<T>, resultSelector?: (element: T, nestLevel: number) => T): Enumerable<T>;
        flatten(): Enumerable<T>;
        pairwise(selector: (prev: T, current: T) => T): Enumerable<T>;
        scan(func: (prev: T, current: T) => T): Enumerable<T>;
        scan(seed: T, func: (prev: T, current: T) => T): Enumerable<T>;
        select<TResult>(selector: (element: T, index: number) => TResult): Enumerable<TResult>;
        selectMany<TResult>(collectionSelector: (element: T, index: number) => TResult[]): Enumerable<TResult>;
        selectMany<TResult>(collectionSelector: (element: T, index: number) => Enumerable<TResult>): Enumerable<TResult>;
        where(predicate: (element: T, index: number) => Boolean): Enumerable<T>;
        choose(selector: (element: T, index: number) => T): Enumerable<T>;
        ofType(type: T): Enumerable<T>;
        zip(second: T[], resultSelector: (first: T, second: T, index: number) => T): Enumerable<T>;
        zip(second: Enumerable<T>, resultSelector: (first: T, second: T, index: number) => T): Enumerable<T>;
        zip(second: { length: number;[x: number]: T; }, resultSelector: (first: T, second: T, index: number) => T): Enumerable<T>;
        zip(...params: T[]): Enumerable<T>; // last one is selector
        merge(second: T[], resultSelector: (first: T, second: T, index: number) => T): Enumerable<T>;
        merge(second: Enumerable<T>, resultSelector: (first: T, second: T, index: number) => T): Enumerable<T>;
        merge(second: { length: number;[x: number]: T; }, resultSelector: (first: T, second: T, index: number) => T): Enumerable<T>;
        merge(...params: T[]): Enumerable<T>; // last one is selector
        join(inner: Enumerable<T>, outerKeySelector: (outer: T) => T, innerKeySelector: (inner: T) => T, resultSelector: (outer: T, inner: T) => T, compareSelector?: (obj: T) => T): Enumerable<T>;
        groupJoin(inner: Enumerable<T>, outerKeySelector: (outer: T) => T, innerKeySelector: (inner: T) => T, resultSelector: (outer: T, inner: T) => T, compareSelector?: (obj: T) => T): Enumerable<T>;
        all(predicate: (element: T) => Boolean): Boolean;
        T(predicate?: (element: T) => Boolean): Boolean;
        isEmpty(): Boolean;
        concat(sequences: T[]): Enumerable<T>;
        insert(index: number, second: T[]): Enumerable<T>;
        insert(index: number, second: Enumerable<T>): Enumerable<T>;
        insert(index: number, second: { length: number;[x: number]: T; }): Enumerable<T>;
        alternate(alternateValue: T): Enumerable<T>;
        alternate(alternateSequence: T[]): Enumerable<T>;
        alternate(alternateSequence: Enumerable<T>): Enumerable<T>;
        contains(value: T, compareSelector: (element: T) => T): Enumerable<T>;
        defaultIfEmpty(defaultValue?: T): Enumerable<T>;
        distinct(compareSelector?: (element: T) => T): Enumerable<T>;
        distinctUntilChanged(compareSelector: (element: T) => T): Enumerable<T>;
        except(second: T[], compareSelector?: (element: T) => T): Enumerable<T>;
        except(second: { length: number;[x: number]: T; }, compareSelector?: (element: T) => T): Enumerable<T>;
        except(second: Enumerable<T>, compareSelector?: (element: T) => T): Enumerable<T>;
        intersect(second: T[], compareSelector?: (element: T) => T): Enumerable<T>;
        intersect(second: { length: number;[x: number]: T; }, compareSelector?: (element: T) => T): Enumerable<T>;
        intersect(second: Enumerable<T>, compareSelector?: (element: T) => T): Enumerable<T>;
        sequenceEqual(second: T[], compareSelector?: (element: T) => T): Enumerable<T>;
        sequenceEqual(second: { length: number;[x: number]: T; }, compareSelector?: (element: T) => T): Enumerable<T>;
        sequenceEqual(second: Enumerable<T>, compareSelector?: (element: T) => T): Enumerable<T>;
        union(second: T[], compareSelector?: (element: T) => T): Enumerable<T>;
        union(second: { length: number;[x: number]: T; }, compareSelector?: (element: T) => T): Enumerable<T>;
        union(second: Enumerable<T>, compareSelector?: (element: T) => T): Enumerable<T>;
        orderBy<TKey>(keySelector: (element: T) => TKey): OrderedEnumerable<T>;
        orderByDescending<TKey>(keySelector: (element: T) => TKey): OrderedEnumerable<T>;
        reverse(): Enumerable<T>;
        shuffle(): Enumerable<T>;
        weightedSample(weightSelector: (element: T) => T): Enumerable<T>;
        groupBy<TKey, TValue>(keySelector: (element: T) => TKey, elementSelector: (element: T) => TValue): Enumerable<Grouping<TKey, TValue>>;
        partitionBy(keySelector: (element: T) => T, elementSelector?: (element: T) => T, resultSelector?: (key: T, element: T) => T, compareSelector?: (element: T) => T): Enumerable<T>;
        buffer(count: number): Enumerable<T>;
        aggregate(func: (prev: T, current: T) => T): T;
        aggregate(seed: T, func: (prev: T, current: T) => T, resultSelector?: (last: T) => T): T;
        average(selector?: (element: T) => number): number;
        count(predicate?: (element: T, index: number) => Boolean): number;
        max(selector?: (element: T) => number): number;
        min(selector?: (element: T) => number): number;
        maxBy(keySelector: (element: T) => T): T;
        minBy(keySelector: (element: T) => T): T;
        sum(selector?: (element: T) => number): number;
        elementAt(index: number): T;
        elementAtOrDefault(index: number, defaultValue?: T): T;
        first(predicate?: (element: T, index: number) => Boolean): T;
        firstOrDefault(predicate?: (element: T, index: number) => Boolean, defaultValue?: T): T;
        last(predicate?: (element: T, index: number) => Boolean): T;
        lastOrDefault(predicate?: (element: T, index: number) => Boolean, defaultValue?: T): T;
        single(predicate?: (element: T, index: number) => Boolean): T;
        singleOrDefault(predicate?: (element: T, index: number) => Boolean, defaultValue?: T): T;
        skip(count: number): Enumerable<T>;
        skipWhile(predicate: (element: T, index: number) => Boolean): Enumerable<T>;
        take(count: number): Enumerable<T>;
        takeWhile(predicate: (element: T, index: number) => Boolean): Enumerable<T>;
        takeExceptLast(count?: number): Enumerable<T>;
        takeFromLast(count: number): Enumerable<T>;
        indexOf(item: T): number;
        indexOf(predicate: (element: T, index: number) => Boolean): number;
        lastIndexOf(item: T): number;
        lastIndexOf(predicate: (element: T, index: number) => Boolean): number;
        asEnumerable(): Enumerable<T>;
        toArray(): T[];
        toLookup(keySelector: (element: T) => T, elementSelector?: (element: T) => T, compareSelector?: (element: T) => T): Lookup<T>;
        toObject(keySelector: (element: T) => T, elementSelector?: (element: T) => T): Object;
        toDictionary<TKey, TValue>(keySelector: (element: T) => TKey, elementSelector: (element: T) => TValue): Dictionary<TKey, TValue>;
        toJSONString(replacer: (key: string, value: T) => T): string;
        toJSONString(replacer: T[]): string;
        toJSONString(replacer: (key: string, value: T) => T, space: T): string;
        toJSONString(replacer: T[], space: T): string;
        toJoinedString(separator?: string, selector?: (element: T, index: number) => T): string;
        doAction(action: (element: T, index: number) => void): Enumerable<T>;
        doAction(action: (element: T, index: number) => Boolean): Enumerable<T>;
        forEach(action: (element: T, index: number) => void): void;
        forEach(action: (element: T) => void): void;
        forEach(action: (element: T, index: number) => Boolean): void;
        forEach(action: (element: T) => Boolean): void;
        write(separator?: string, selector?: (element: T) => T): void;
        writeLine(selector?: (element: T) => T): void;
        force(): void;
        letBind(func: (source: Enumerable<T>) => T[]): Enumerable<T>;
        letBind(func: (source: Enumerable<T>) => { length: number;[x: number]: T; }): Enumerable<T>;
        letBind(func: (source: Enumerable<T>) => Enumerable<T>): Enumerable<T>;
        share(): DisposableEnumerable<T>;
        memoize(): DisposableEnumerable<T>;
        catchError(handler: (exception: T) => void): Enumerable<T>;
        finallyAction(finallyAction: () => void): Enumerable<T>;
        log(selector?: (element: T) => void): Enumerable<T>;
        trace(message?: string, selector?: (element: T) => void): Enumerable<T>;
    }

    interface OrderedEnumerable<T> extends Enumerable<T> {
        createOrderedEnumerable(keySelector: (element: T) => T, descending: Boolean): OrderedEnumerable<T>;
        thenBy(keySelector: (element: T) => T): OrderedEnumerable<T>;
        thenByDescending(keySelector: (element: T) => T): OrderedEnumerable<T>;
    }

    interface DisposableEnumerable<T> extends Enumerable<T> {
        dispose(): void;
    }

    export class Dictionary<TKey, TValue> {
        constructor();

        add(key: TKey, value: TValue): void;
        get(key: TKey): TValue;
        set(key: TKey, value: TValue): Boolean;
        contains(key: TKey): Boolean;
        clear(): void;
        remove(key: TKey): void;
        count(): number;
        toEnumerable(): Enumerable<KeyValuePair<TKey, TValue>>;
    }

    interface KeyValuePair<TKey, TValue> {
        key: TKey;
        value: TValue;
    }

    interface Lookup<T> {
        count(): number;
        get(key: T): Enumerable<T>;
        contains(key: T): Boolean;
        toEnumerable(): Enumerable<T>;
    }

    interface Grouping<TKey, TValue> extends Enumerable<TValue> {
        key(): TKey;
    }
}

// export definition
declare var Enumerable: linqjs.EnumerableStatic;interface MaskedInputOptions {
}

declare class MaskedInput {
	constructor(args: MaskedInputOptions);
}// Type definitions for Moment.js 2.8.0
// Project: https://github.com/timrwood/moment
// Definitions by: Michael Lakerveld <https://github.com/Lakerfield>, Aaron King <https://github.com/kingdango>, Hiroki Horiuchi <https://github.com/horiuchi>, Dick van den Brink <https://github.com/DickvdBrink>, Adi Dahiya <https://github.com/adidahiya>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module moment {

    interface MomentInput {

        years?: number;
        y?: number;

        months?: number;
        M?: number;

        weeks?: number;
        w?: number;

        days?: number;
        d?: number;

        hours?: number;
        h?: number;

        minutes?: number;
        m?: number;

        seconds?: number;
        s?: number;

        milliseconds?: number;
        ms?: number;

    }

    interface Duration {

        humanize(withSuffix?: boolean): string;

        as(units: string): number;

        milliseconds(): number;
        asMilliseconds(): number;

        seconds(): number;
        asSeconds(): number;

        minutes(): number;
        asMinutes(): number;

        hours(): number;
        asHours(): number;

        days(): number;
        asDays(): number;

        months(): number;
        asMonths(): number;

        years(): number;
        asYears(): number;

        add(n: number, p: string): Duration;
        add(n: number): Duration;
        add(d: Duration): Duration;

        subtract(n: number, p: string): Duration;
        subtract(n: number): Duration;
        subtract(d: Duration): Duration;

        toISOString(): string;

    }

    interface Moment {

        format(format: string): string;
        format(): string;

        fromNow(withoutSuffix?: boolean): string;

        startOf(unitOfTime: string): Moment;
        endOf(unitOfTime: string): Moment;

        /**
         * Mutates the original moment by adding time. (deprecated in 2.8.0)
         *
         * @param unitOfTime the unit of time you want to add (eg "years" / "hours" etc)
         * @param amount the amount you want to add
         */
        add(unitOfTime: string, amount: number): Moment;
        /**
         * Mutates the original moment by adding time.
         *
         * @param amount the amount you want to add
         * @param unitOfTime the unit of time you want to add (eg "years" / "hours" etc)
         */
        add(amount: number, unitOfTime: string): Moment;
        /**
         * Mutates the original moment by adding time. Note that the order of arguments can be flipped.
         *
         * @param amount the amount you want to add
         * @param unitOfTime the unit of time you want to add (eg "years" / "hours" etc)
         */
        add(amount: string, unitOfTime: string): Moment;
        /**
         * Mutates the original moment by adding time.
         *
         * @param objectLiteral an object literal that describes multiple time units {days:7,months:1}
         */
        add(objectLiteral: MomentInput): Moment;
        /**
         * Mutates the original moment by adding time.
         *
         * @param duration a length of time
         */
        add(duration: Duration): Moment;

        /**
         * Mutates the original moment by subtracting time. (deprecated in 2.8.0)
         *
         * @param unitOfTime the unit of time you want to subtract (eg "years" / "hours" etc)
         * @param amount the amount you want to subtract
         */
        subtract(unitOfTime: string, amount: number): Moment;
        /**
         * Mutates the original moment by subtracting time.
         *
         * @param unitOfTime the unit of time you want to subtract (eg "years" / "hours" etc)
         * @param amount the amount you want to subtract
         */
        subtract(amount: number, unitOfTime: string): Moment;
        /**
         * Mutates the original moment by subtracting time. Note that the order of arguments can be flipped.
         *
         * @param amount the amount you want to add
         * @param unitOfTime the unit of time you want to subtract (eg "years" / "hours" etc)
         */
        subtract(amount: string, unitOfTime: string): Moment;
        /**
         * Mutates the original moment by subtracting time.
         *
         * @param objectLiteral an object literal that describes multiple time units {days:7,months:1}
         */
        subtract(objectLiteral: MomentInput): Moment;
        /**
         * Mutates the original moment by subtracting time.
         *
         * @param duration a length of time
         */
        subtract(duration: Duration): Moment;

        calendar(): string;
        calendar(start: Moment): string;

        clone(): Moment;

        /**
         * @return Unix timestamp, or milliseconds since the epoch.
         */
        valueOf(): number;

        local(): Moment; // current date/time in local mode

        utc(): Moment; // current date/time in UTC mode

        isValid(): boolean;

        year(y: number): Moment;
        year(): number;
        quarter(): number;
        quarter(q: number): Moment;
        month(M: number): Moment;
        month(M: string): Moment;
        month(): number;
        day(d: number): Moment;
        day(d: string): Moment;
        day(): number;
        date(d: number): Moment;
        date(): number;
        hour(h: number): Moment;
        hour(): number;
        hours(h: number): Moment;
        hours(): number;
        minute(m: number): Moment;
        minute(): number;
        minutes(m: number): Moment;
        minutes(): number;
        second(s: number): Moment;
        second(): number;
        seconds(s: number): Moment;
        seconds(): number;
        millisecond(ms: number): Moment;
        millisecond(): number;
        milliseconds(ms: number): Moment;
        milliseconds(): number;
        weekday(): number;
        weekday(d: number): Moment;
        isoWeekday(): number;
        isoWeekday(d: number): Moment;
        weekYear(): number;
        weekYear(d: number): Moment;
        isoWeekYear(): number;
        isoWeekYear(d: number): Moment;
        week(): number;
        week(d: number): Moment;
        weeks(): number;
        weeks(d: number): Moment;
        isoWeek(): number;
        isoWeek(d: number): Moment;
        isoWeeks(): number;
        isoWeeks(d: number): Moment;
        weeksInYear(): number;
        isoWeeksInYear(): number;
        dayOfYear(): number;
        dayOfYear(d: number): Moment;

        from(f: Moment): string;
        from(f: Moment, suffix: boolean): string;
        from(d: Date): string;
        from(s: string): string;
        from(date: number[]): string;

        diff(b: Moment): number;
        diff(b: Moment, unitOfTime: string): number;
        diff(b: Moment, unitOfTime: string, round: boolean): number;

        toArray(): number[];
        toDate(): Date;
        toISOString(): string;
        toJSON(): string;
        unix(): number;

        isLeapYear(): boolean;
        zone(): number;
        zone(b: number): Moment;
        zone(b: string): Moment;
        daysInMonth(): number;
        isDST(): boolean;

        isBefore(): boolean;
        isBefore(b: Moment): boolean;
        isBefore(b: string): boolean;
        isBefore(b: Number): boolean;
        isBefore(b: Date): boolean;
        isBefore(b: number[]): boolean;
        isBefore(b: Moment, granularity: string): boolean;
        isBefore(b: String, granularity: string): boolean;
        isBefore(b: Number, granularity: string): boolean;
        isBefore(b: Date, granularity: string): boolean;
        isBefore(b: number[], granularity: string): boolean;

        isAfter(): boolean;
        isAfter(b: Moment): boolean;
        isAfter(b: string): boolean;
        isAfter(b: Number): boolean;
        isAfter(b: Date): boolean;
        isAfter(b: number[]): boolean;
        isAfter(b: Moment, granularity: string): boolean;
        isAfter(b: String, granularity: string): boolean;
        isAfter(b: Number, granularity: string): boolean;
        isAfter(b: Date, granularity: string): boolean;
        isAfter(b: number[], granularity: string): boolean;

        isSame(b: Moment): boolean;
        isSame(b: string): boolean;
        isSame(b: Number): boolean;
        isSame(b: Date): boolean;
        isSame(b: number[]): boolean;
        isSame(b: Moment, granularity: string): boolean;
        isSame(b: String, granularity: string): boolean;
        isSame(b: Number, granularity: string): boolean;
        isSame(b: Date, granularity: string): boolean;
        isSame(b: number[], granularity: string): boolean;

        // Deprecated as of 2.8.0.
        lang(language: string): Moment;
        lang(reset: boolean): Moment;
        lang(): MomentLanguage;

        locale(language: string): Moment;
        locale(reset: boolean): Moment;
        locale(): string;

        localeData(language: string): Moment;
        localeData(reset: boolean): Moment;
        localeData(): MomentLanguage;

        // Deprecated as of 2.7.0.
        max(date: Date): Moment;
        max(date: number): Moment;
        max(date: any[]): Moment;
        max(date: string): Moment;
        max(date: string, format: string): Moment;
        max(clone: Moment): Moment;

        // Deprecated as of 2.7.0.
        min(date: Date): Moment;
        min(date: number): Moment;
        min(date: any[]): Moment;
        min(date: string): Moment;
        min(date: string, format: string): Moment;
        min(clone: Moment): Moment;

        get(unit: string): number;
        set(unit: string, value: number): Moment;

    }

    interface MomentCalendar {

		lastDay: any;
		sameDay: any;
		nextDay: any;
		lastWeek: any;
		nextWeek: any;
		sameElse: any;

    }

    interface MomentLanguage {

		months?: any;
		monthsShort?: any;
		weekdays?: any;
		weekdaysShort?: any;
		weekdaysMin?: any;
		longDateFormat?: MomentLongDateFormat;
		relativeTime?: MomentRelativeTime;
		meridiem?: (hour: number, minute: number, isLowercase: boolean) => string;
		calendar?: MomentCalendar;
		ordinal?: (num: number) => string;

    }

    interface MomentLongDateFormat {

		L: string;
		LL: string;
		LLL: string;
		LLLL: string;
		LT: string;
		l?: string;
		ll?: string;
		lll?: string;
		llll?: string;
		lt?: string;

    }

    interface MomentRelativeTime {

		future: any;
		past: any;
		s: any;
		m: any;
		mm: any;
		h: any;
		hh: any;
		d: any;
		dd: any;
		M: any;
		MM: any;
		y: any;
		yy: any;

    }

    interface MomentStatic {

        version: string;

        (): Moment;
        (date: number): Moment;
        (date: number[]): Moment;
        (date: string, format?: string, strict?: boolean): Moment;
        (date: string, format?: string, language?: string, strict?: boolean): Moment;
        (date: string, formats: string[], strict?: boolean): Moment;
        (date: string, formats: string[], language?: string, strict?: boolean): Moment;
        (date: string, specialFormat: () => void, strict?: boolean): Moment;
        (date: string, specialFormat: () => void, language?: string, strict?: boolean): Moment;
        (date: string, formatsIncludingSpecial: any[], strict?: boolean): Moment;
        (date: string, formatsIncludingSpecial: any[], language?: string, strict?: boolean): Moment;
        (date: Date): Moment;
        (date: Moment): Moment;
        (date: Object): Moment;

        utc(): Moment;
        utc(date: number): Moment;
        utc(date: number[]): Moment;
        utc(date: string, format?: string, strict?: boolean): Moment;
        utc(date: string, format?: string, language?: string, strict?: boolean): Moment;
        utc(date: string, formats: string[], strict?: boolean): Moment;
        utc(date: string, formats: string[], language?: string, strict?: boolean): Moment;
        utc(date: Date): Moment;
        utc(date: Moment): Moment;
        utc(date: Object): Moment;

        unix(timestamp: number): Moment;

        invalid(parsingFlags?: Object): Moment;
        isMoment(): boolean;
        isMoment(m: any): boolean;
        isDuration(): boolean;
        isDuration(d: any): boolean;

        // Deprecated in 2.8.0.
        lang(language?: string): string;
        lang(language?: string, definition?: MomentLanguage): string;

        locale(language?: string): string;
        locale(language?: string[]): string;
        locale(language?: string, definition?: MomentLanguage): string;

        localeData(language?: string): MomentLanguage;

        longDateFormat: any;
        relativeTime: any;
        meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
        calendar: any;
        ordinal: (num: number) => string;

        duration(milliseconds: Number): Duration;
        duration(num: Number, unitOfTime: string): Duration;
        duration(input: MomentInput): Duration;
        duration(object: any): Duration;
        duration(): Duration;

        parseZone(date: string): Moment;

        months(): string[];
        months(index: number): string;
        months(format: string): string[];
        months(format: string, index: number): string;
        monthsShort(): string[];
        monthsShort(index: number): string;
        monthsShort(format: string): string[];
        monthsShort(format: string, index: number): string;

        weekdays(): string[];
        weekdays(index: number): string;
        weekdays(format: string): string[];
        weekdays(format: string, index: number): string;
        weekdaysShort(): string[];
        weekdaysShort(index: number): string;
        weekdaysShort(format: string): string[];
        weekdaysShort(format: string, index: number): string;
        weekdaysMin(): string[];
        weekdaysMin(index: number): string;
        weekdaysMin(format: string): string[];
        weekdaysMin(format: string, index: number): string;

        min(moments: Moment[]): Moment;
        max(moments: Moment[]): Moment;

        normalizeUnits(unit: string): string;
        relativeTimeThreshold(threshold: string, limit: number): void;

        /**
         * Constant used to enable explicit ISO_8601 format parsing.
         */
        ISO_8601(): void;

    }

}

declare var moment: moment.MomentStatic;

declare module 'moment' {
    export = moment;
}declare module Vidyano {
    export interface Route {
        enter(fnc: Function): Route;
        to(fnc: Function): Route;
        exit(fnc: Function): Route;
        params: any;
        path: string;
    }

    export interface PathRescueArguments {
        current: string;
    }

    export interface PathArguments {
        path: string;
        params: { [key: string]: string };
    }

    export interface PathStatic {
        map(path: string): Route;
        root(path: string): void;
        routes: {
            current: string;
            defined: {
                [key: string]: Route
            };
        };
        listen(): void;
        rescue(fnc: Function): void;
        history: {
            pushState(state: any, title: string, path: string);
            replaceState(state: any, title: string, path: string);
            listen();
        };
        match(path: string, parameterize: boolean): Route;
    }

    export var Path: PathStatic;
}interface PolymerProperty {
    type: ObjectConstructor | StringConstructor | BooleanConstructor | DateConstructor | NumberConstructor | ArrayConstructor;
    computed?: string;
    reflectToAttribute?: boolean;
    readOnly?: boolean;
    observer?: string;
    value?: number | boolean | string | Function;
    notify?: boolean;
}

interface PolymerProperties {
    [name: string]: ObjectConstructor | StringConstructor | BooleanConstructor | DateConstructor | NumberConstructor | ArrayConstructor | PolymerProperty;
}

interface PolymerDomApiClassList {
    add(className: string): void;
    remove(className: string): void;
    toggle(className: string): void;
}

interface PolymerDomApi {
    getDistributedNodes(): HTMLElement[];
    getDestinationInsertionPoints(): HTMLElement[];
    flush(): void;
    childNodes: Node[];
    children: HTMLElement[];
    classList: PolymerDomApiClassList;
    firstChild: Node;
    firstElementChild: Element;
    innerHTML: string;
    lastChild: Node;
    lastElementChild: Element;
    nextElementSibling: Element;
    nextSibling: Node;
    node: Node;
    parentNode: Node;
    previousElementSibling: Element;
    previousSibling: Node;
    textContent: string;
    insertBefore(newChild: Node | Vidyano.WebComponents.WebComponent, refChild?: Node | Vidyano.WebComponents.WebComponent): Node;
    removeAttribute(name?: string): void;
    setAttribute(name?: string, value?: string): void;
    querySelector(selectors: string): Node | HTMLElement | Vidyano.WebComponents.WebComponent;
    querySelectorAll(selectors: string): NodeList;
    appendChild(newChild: Node | Vidyano.WebComponents.WebComponent): Node | Vidyano.WebComponents.WebComponent;
    removeChild(oldChild: Node | Vidyano.WebComponents.WebComponent): Node | Vidyano.WebComponents.WebComponent;
    replaceChild(newChild: Node | Vidyano.WebComponents.WebComponent, oldChild: Node | Vidyano.WebComponents.WebComponent): Node;
    getEffectiveChildNodes(): Node[];
    observeNodes(callBack: (info: PolymerDomChangedInfo) => void): PolymerDomChangeObserver;
    unobserveNodes(observer: PolymerDomChangeObserver);
}

interface PolymerDomChangedInfo {
    addedNodes: Node;
    removedNodes: Node;
}

interface PolymerDomChangeObserver {
}

interface PolymerTrackEvent extends CustomEvent {
    detail: {
        sourceEvent?: Event;
    }
}

interface PolymerTrackDetail {
    /**
    state - a string indicating the tracking state:
        - start - fired when tracking is first detected (finger/button down and moved past a pre-set distance threshold)
        - track - fired while tracking
        - end - fired when tracking ends
    */
    state: string;
    /** clientX coordinate for event */
    x: number;
    /** clientY coordinate for event */
    y: number;
    /** change in pixels horizontally since the first track event */
    dx: number;
    /** change in pixels vertically since the first track event */
    dy: number;
    /** change in pixels horizontally since last track event */
    ddx: number;
    /** change in pixels vertically since last track event */
    ddy: number;
    /** a function that may be called to determine the element currently being hovered */
    hover(): Element | Vidyano.WebComponents.WebComponent;
}

interface PolymerTemplate extends Node {
    stamp: (model: any) => TemplateInstance;
}

interface TemplateInstance {
    item: any;
    index: number;
    root: DocumentFragment;
}

interface TapEvent extends CustomEvent {
    detail: {
        x: number;
        y: number;
        sourceEvent: Event;
    };

    model?: TemplateInstance | any;
}

interface PolymerGestures {
    add: (node: HTMLElement, eventName: string, handler: Function) => void;
    remove: (node: HTMLElement, eventName: string, handler: Function) => void;
}

declare var Polymer: {
    (polymer: any): void;
    dom(element: Node | Vidyano.WebComponents.WebComponent): PolymerDomApi;
    getRegisteredPrototype(tagName: string): any;

    /**
     * Returns true if the element is a Polymer web component.
     */
    isInstance(element: HTMLElement): boolean;

    whenReady(callback: () => void): void;

    /**
     * no-operation function for handy stubs
     */
    nop(): void;

    api: any;

    Gestures: PolymerGestures;
};
declare var CustomElements: {
    registry: {
        [tag: string]: {
            ctor: any;
        }
    }

    ready: boolean;
    useNative: boolean;
};
declare class Queue {
    constructor(maxConcurrentPromises: number, maxQueuedPromises?: number);
    add<T>(work: () => Promise<T>): Promise<T>;
    getQueueLength(): number;
}
// Type definitions for QUnit v1.16
// Project: http://qunitjs.com/
// Definitions by: Diullei Gomes <https://github.com/diullei>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


interface DoneCallbackObject {
    /**
    * The number of failed assertions
    */
    failed: number;

    /**
    * The number of passed assertions
    */
    passed: number;

    /**
    * The total number of assertions
    */
    total: number;

    /**
    * The time in milliseconds it took tests to run from start to finish.
    */
    runtime: number;
}

interface LogCallbackObject {
    /**
    * The boolean result of an assertion, true means passed, false means failed.
    */
    result: boolean;

    /**
    * One side of a comparision assertion. Can be undefined when ok() is used.
    */
    actual: Object;

    /**
    * One side of a comparision assertion. Can be undefined when ok() is used.
    */
    expected: Object;

    /**
    * A string description provided by the assertion.
    */
    message: string;

    /**
    * The associated stacktrace, either from an exception or pointing to the source
    * of the assertion. Depends on browser support for providing stacktraces, so can be
    * undefined.
    */
    source: string;
}

interface ModuleStartCallbackObject {
    /**
    * Name of the next module to run
    */
    name: string;
}

interface ModuleDoneCallbackObject {
    /**
    * Name of this module
    */
    name: string;

    /**
    * The number of failed assertions
    */
    failed: number;

    /**
    * The number of passed assertions
    */
    passed: number;

    /**
    * The total number of assertions
    */
    total: number;
}

interface TestDoneCallbackObject {
    /**
    * TName of the next test to run
    */
    name: string;

    /**
    * Name of the current module
    */
    module: string;

    /**
    * The number of failed assertions
    */
    failed: number;

    /**
    * The number of passed assertions
    */
    passed: number;

    /**
    * The total number of assertions
    */
    total: number;

    /**
    * The total runtime, including setup and teardown
    */
    duration: number;
}

interface TestStartCallbackObject {
    /**
    * Name of the next test to run
    */
    name: string;

    /**
    * Name of the current module
    */
    module: string;
}

interface Config {
    altertitle: boolean;
    autostart: boolean;
    current: Object;
    reorder: boolean;
    requireExpects: boolean;
    testTimeout: number;
    urlConfig: Array<URLConfigItem>;
    done: any;
}

interface URLConfigItem {
    id: string;
    label: string;
    tooltip: string;
}

interface LifecycleObject {
    /**
     * Runs before each test
     * @param assert
     * @deprecated
     */
    setup?: (assert: QUnitAssert) => void;

    /**
     * Runs after each test
     * @param assert
     * @deprecated
     */
    teardown?: (assert: QUnitAssert) => void;
    /**
     * Runs before each test
     * @param assert
     */
    beforeEach?: (assert: QUnitAssert) => void;
    /**
     * Runs after each test
     * @param assert
     */
    afterEach?: (assert: QUnitAssert) => void;

    /**
     * Any additional properties on the hooks object will be added to that context.
     */
    [property: string]: any;
}

interface QUnitAssert {
    /* ASSERT */
    assert: any;
    current_testEnvironment: any;
    jsDump: any;

    /**
    * Instruct QUnit to wait for an asynchronous operation.
    *
    * When your test has any asynchronous exit points, call assert.async() to get a unique
    * resolution callback for each async operation. The callback returned from assert.async()
    * will throw an Error if is invoked more than once.
    */
    async(): () => void;

    /**
    * A deep recursive comparison assertion, working on primitive types, arrays, objects,
    * regular expressions, dates and functions.
    *
    * The deepEqual() assertion can be used just like equal() when comparing the value of
    * objects, such that { key: value } is equal to { key: value }. For non-scalar values,
    * identity will be disregarded by deepEqual.
    *
    * @param actual Object or Expression being tested
    * @param expected Known comparison value
    * @param message A short description of the assertion
    */
    deepEqual(actual: any, expected: any, message?: string): any;

    /**
    * A non-strict comparison assertion, roughly equivalent to JUnit assertEquals.
    *
    * The equal assertion uses the simple comparison operator (==) to compare the actual
    * and expected arguments. When they are equal, the assertion passes: any; otherwise, it fails.
    * When it fails, both actual and expected values are displayed in the test result,
    * in addition to a given message.
    *
    * @param actual Expression being tested
    * @param expected Known comparison value
    * @param message A short description of the assertion
    */
    equal(actual: any, expected: any, message?: string): any;

    /**
    * Specify how many assertions are expected to run within a test.
    *
    * To ensure that an explicit number of assertions are run within any test, use
    * expect( number ) to register an expected count. If the number of assertions
    * run does not match the expected count, the test will fail.
    *
    * @param amount Number of assertions in this test.
    */
    expect(amount: number): any;

    /**
    * An inverted deep recursive comparison assertion, working on primitive types,
    * arrays, objects, regular expressions, dates and functions.
    *
    * The notDeepEqual() assertion can be used just like equal() when comparing the
    * value of objects, such that { key: value } is equal to { key: value }. For non-scalar
    * values, identity will be disregarded by notDeepEqual.
    *
    * @param actual Object or Expression being tested
    * @param expected Known comparison value
    * @param message A short description of the assertion
    */
    notDeepEqual(actual: any, expected: any, message?: string): any;

    /**
    * A non-strict comparison assertion, checking for inequality.
    *
    * The notEqual assertion uses the simple inverted comparison operator (!=) to compare
    * the actual and expected arguments. When they aren't equal, the assertion passes: any;
    * otherwise, it fails. When it fails, both actual and expected values are displayed
    * in the test result, in addition to a given message.
    *
    * @param actual Expression being tested
    * @param expected Known comparison value
    * @param message A short description of the assertion
    */
    notEqual(actual: any, expected: any, message?: string): any;

    notPropEqual(actual: any, expected: any, message?: string): any;

    propEqual(actual: any, expected: any, message?: string): any;

    /**
    * A non-strict comparison assertion, checking for inequality.
    *
    * The notStrictEqual assertion uses the strict inverted comparison operator (!==)
    * to compare the actual and expected arguments. When they aren't equal, the assertion
    * passes: any; otherwise, it fails. When it fails, both actual and expected values are
    * displayed in the test result, in addition to a given message.
    *
    * @param actual Expression being tested
    * @param expected Known comparison value
    * @param message A short description of the assertion
    */
    notStrictEqual(actual: any, expected: any, message?: string): any;

    /**
    * A boolean assertion, equivalent to CommonJS’s assert.ok() and JUnit’s assertTrue().
    * Passes if the first argument is truthy.
    *
    * The most basic assertion in QUnit, ok() requires just one argument. If the argument
    * evaluates to true, the assertion passes; otherwise, it fails. If a second message
    * argument is provided, it will be displayed in place of the result.
    *
    * @param state Expression being tested
    * @param message A short description of the assertion
    */
    ok(state: any, message?: string): any;

    /**
    * A strict type and value comparison assertion.
    *
    * The strictEqual() assertion provides the most rigid comparison of type and value with
    * the strict equality operator (===)
    *
    * @param actual Expression being tested
    * @param expected Known comparison value
    * @param message A short description of the assertion
    */
    strictEqual(actual: any, expected: any, message?: string): any;

    /**
    * Assertion to test if a callback throws an exception when run.
    *
    * When testing code that is expected to throw an exception based on a specific set of
    * circumstances, use throws() to catch the error object for testing and comparison.
    *
    * @param block Function to execute
    * @param expected Error Object to compare
    * @param message A short description of the assertion
    */
    throws(block: () => any, expected: any, message?: string): any;

    /**
    * @param block Function to execute
    * @param message A short description of the assertion
    */
    throws(block: () => any, message?: string): any;

    /**
    * Alias of throws.
    *
    * In very few environments, like Closure Compiler, throws is considered a reserved word
    * and will cause an error. For that case, an alias is bundled called raises. It has the
    * same signature and behaviour, just a different name.
    *
    * @param block Function to execute
    * @param expected Error Object to compare
    * @param message A short description of the assertion
    */
    raises(block: () => any, expected: any, message?: string): any;

    /**
    * Alias of throws.
    *
    * In very few environments, like Closure Compiler, throws is considered a reserved word
    * and will cause an error. For that case, an alias is bundled called raises. It has the
    * same signature and behaviour, just a different name.
    *
    * @param block Function to execute
    * @param message A short description of the assertion
    */
    raises(block: () => any, message?: string): any;
}

interface QUnitStatic extends QUnitAssert {
    /* ASYNC CONTROL */

    /**
    * Start running tests again after the testrunner was stopped. See stop().
    *
    * When your async test has multiple exit points, call start() for the corresponding number of stop() increments.
    *
    * @param decrement Optional argument to merge multiple start() calls into one. Use with multiple corrsponding stop() calls.
    */
    start(decrement?: number): any;

    /**
    * Stop the testrunner to wait for async tests to run. Call start() to continue.
    *
    * When your async test has multiple exit points, call stop() with the increment argument, corresponding to the number of start() calls you need.
    *
    * On Blackberry 5.0, window.stop is a native read-only function. If you deal with that browser, use QUnit.stop() instead, which will work anywhere.
    *
    * @param decrement Optional argument to merge multiple stop() calls into one. Use with multiple corrsponding start() calls.
    */
    stop(increment?: number): any;

    /* CALLBACKS */

    /**
    * Register a callback to fire whenever the test suite begins.
    *
    * QUnit.begin() is called once before running any tests. (a better would've been QUnit.start,
    * but thats already in use elsewhere and can't be changed.)
    *
    * @param callback Callback to execute
    */
    begin(callback: () => any): any;

    /**
    * Register a callback to fire whenever the test suite ends.
    *
    * @param callback Callback to execute.
    */
    done(callback: (details: DoneCallbackObject) => any): any;

    /**
    * Register a callback to fire whenever an assertion completes.
    *
    * This is one of several callbacks QUnit provides. Its intended for integration scenarios like
    * PhantomJS or Jenkins. The properties of the details argument are listed below as options.
    *
    * @param callback Callback to execute.
    */
    log(callback: (details: LogCallbackObject) => any): any;

    /**
    * Register a callback to fire whenever a module ends.
    *
    * @param callback Callback to execute.
    */
    moduleDone(callback: (details: ModuleDoneCallbackObject) => any): any;

    /**
    * Register a callback to fire whenever a module begins.
    *
    * @param callback Callback to execute.
    */
    moduleStart(callback: (details: ModuleStartCallbackObject) => any): any;

    /**
    * Register a callback to fire whenever a test ends.
    *
    * @param callback Callback to execute.
    */
    testDone(callback: (details: TestDoneCallbackObject) => any): any;

    /**
    * Register a callback to fire whenever a test begins.
    *
    * @param callback Callback to execute.
    */
    testStart(callback: (details: TestStartCallbackObject) => any): any;

    /* CONFIGURATION */

    /**
    * QUnit has a bunch of internal configuration defaults, some of which are
    * useful to override. Check the description for each option for details.
    */
    config: Config;

    /* TEST */

    /**
    * Add an asynchronous test to run. The test must include a call to start().
    *
    * For testing asynchronous code, asyncTest will automatically stop the test runner
    * and wait for your code to call start() to continue.
    *
    * @param name Title of unit being tested
    * @param expected Number of assertions in this test
    * @param test Function to close over assertions
    */
    asyncTest(name: string, expected: number, test: (assert: QUnitAssert) => any): any;

    /**
    * Add an asynchronous test to run. The test must include a call to start().
    *
    * For testing asynchronous code, asyncTest will automatically stop the test runner
    * and wait for your code to call start() to continue.
    *
    * @param name Title of unit being tested
    * @param test Function to close over assertions
    */
    asyncTest(name: string, test: (assert: QUnitAssert) => any): any;

    /**
    * Specify how many assertions are expected to run within a test.
    *
    * To ensure that an explicit number of assertions are run within any test, use
    * expect( number ) to register an expected count. If the number of assertions
    * run does not match the expected count, the test will fail.
    *
    * @param amount Number of assertions in this test.
    * @depricated since version 1.16
    */
    expect(amount: number): any;

    /**
    * Group related tests under a single label.
    *
    * All tests that occur after a call to module() will be grouped into that module.
    * The test names will all be preceded by the module name in the test results.
    * You can then use that module name to select tests to run.
    *
    * @param name Label for this group of tests
    * @param lifecycle Callbacks to run before and after each test
    */
    module(name: string, lifecycle?: LifecycleObject): any;

    /**
    * Add a test to run.
    *
    * When testing the most common, synchronous code, use test().
    * The assert argument to the callback contains all of QUnit's assertion methods.
    * If you are avoiding using any of QUnit's globals, you can use the assert
    * argument instead.
    *
    * @param title Title of unit being tested
    * @param expected Number of assertions in this test
    * @param test Function to close over assertions
    */
    test(title: string, expected: number, test: (assert: QUnitAssert) => any): any;

    /**
    * @param title Title of unit being tested
    * @param test Function to close over assertions
    */
    test(title: string, test: (assert: QUnitAssert) => any): any;

    /**
    * https://github.com/jquery/qunit/blob/master/qunit/qunit.js#L1568
    */
    equiv(a: any, b: any): any;

    /**
    * https://github.com/jquery/qunit/blob/master/qunit/qunit.js#L897
    */
    push(result: any, actual: any, expected: any, message: string): any;

    /**
    * https://github.com/jquery/qunit/blob/master/qunit/qunit.js#L839
    */
    reset(): any;
}

/* ASSERT */

/**
* A deep recursive comparison assertion, working on primitive types, arrays, objects,
* regular expressions, dates and functions.
*
* The deepEqual() assertion can be used just like equal() when comparing the value of
* objects, such that { key: value } is equal to { key: value }. For non-scalar values,
* identity will be disregarded by deepEqual.
*
* @param actual Object or Expression being tested
* @param expected Known comparison value
* @param message A short description of the assertion
*/
declare function deepEqual(actual: any, expected: any, message?: string): any;

/**
* A non-strict comparison assertion, roughly equivalent to JUnit assertEquals.
*
* The equal assertion uses the simple comparison operator (==) to compare the actual
* and expected arguments. When they are equal, the assertion passes: any; otherwise, it fails.
* When it fails, both actual and expected values are displayed in the test result,
* in addition to a given message.
*
* @param actual Expression being tested
* @param expected Known comparison value
* @param message A short description of the assertion
*/
declare function equal(actual: any, expected: any, message?: string): any;

/**
* An inverted deep recursive comparison assertion, working on primitive types,
* arrays, objects, regular expressions, dates and functions.
*
* The notDeepEqual() assertion can be used just like equal() when comparing the
* value of objects, such that { key: value } is equal to { key: value }. For non-scalar
* values, identity will be disregarded by notDeepEqual.
*
* @param actual Object or Expression being tested
* @param expected Known comparison value
* @param message A short description of the assertion
*/
declare function notDeepEqual(actual: any, expected: any, message?: string): any;

/**
* A non-strict comparison assertion, checking for inequality.
*
* The notEqual assertion uses the simple inverted comparison operator (!=) to compare
* the actual and expected arguments. When they aren't equal, the assertion passes;
* otherwise, it fails. When it fails, both actual and expected values are displayed
* in the test result, in addition to a given message.
*
* @param actual Expression being tested
* @param expected Known comparison value
* @param message A short description of the assertion
*/
declare function notEqual(actual: any, expected: any, message?: string): any;

/**
* A non-strict comparison assertion, checking for inequality.
*
* The notStrictEqual assertion uses the strict inverted comparison operator (!==)
* to compare the actual and expected arguments. When they aren't equal, the assertion
* passes; otherwise, it fails. When it fails, both actual and expected values are
* displayed in the test result, in addition to a given message.
*
* @param actual Expression being tested
* @param expected Known comparison value
* @param message A short description of the assertion
*/
declare function notStrictEqual(actual: any, expected: any, message?: string): any;

/**
* A boolean assertion, equivalent to CommonJS’s assert.ok() and JUnit’s assertTrue().
* Passes if the first argument is truthy.
*
* The most basic assertion in QUnit, ok() requires just one argument. If the argument
* evaluates to true, the assertion passes; otherwise, it fails. If a second message
* argument is provided, it will be displayed in place of the result.
*
* @param state Expression being tested
* @param message A short description of the assertion
*/
declare function ok(state: any, message?: string): any;

/**
* A strict type and value comparison assertion.
*
* The strictEqual() assertion provides the most rigid comparison of type and value with
* the strict equality operator (===)
*
* @param actual Expression being tested
* @param expected Known comparison value
* @param message A short description of the assertion
*/
declare function strictEqual(actual: any, expected: any, message?: string): any;

/**
* Assertion to test if a callback throws an exception when run.
*
* When testing code that is expected to throw an exception based on a specific set of
* circumstances, use throws() to catch the error object for testing and comparison.
*
* @param block Function to execute
* @param expected Error Object to compare
* @param message A short description of the assertion
*/
declare function throws(block: () => any, expected: any, message?: string): any;

/**
* @param block Function to execute
* @param message A short description of the assertion
*/
declare function throws(block: () => any, message?: string): any;

/* ASYNC CONTROL */

/**
* Start running tests again after the testrunner was stopped. See stop().
*
* When your async test has multiple exit points, call start() for the corresponding number of stop() increments.
*
* @param decrement Optional argument to merge multiple start() calls into one. Use with multiple corrsponding stop() calls.
*/
declare function start(decrement?: number): any;

/**
* Stop the testrunner to wait for async tests to run. Call start() to continue.
*
* When your async test has multiple exit points, call stop() with the increment argument, corresponding to the number of start() calls you need.
*
* On Blackberry 5.0, window.stop is a native read-only function. If you deal with that browser, use QUnit.stop() instead, which will work anywhere.
*
* @param decrement Optional argument to merge multiple stop() calls into one. Use with multiple corrsponding start() calls.
*/
declare function stop(increment?: number): any;

/* CALLBACKS */

/**
* Register a callback to fire whenever the test suite begins.
*
* QUnit.begin() is called once before running any tests. (a better would've been QUnit.start,
* but thats already in use elsewhere and can't be changed.)
*
* @param callback Callback to execute
*/
declare function begin(callback: () => any): any;

/**
* Register a callback to fire whenever the test suite ends.
*
* @param callback Callback to execute.
*/
declare function done(callback: (details: DoneCallbackObject) => any): any;

/**
* Register a callback to fire whenever an assertion completes.
*
* This is one of several callbacks QUnit provides. Its intended for integration scenarios like
* PhantomJS or Jenkins. The properties of the details argument are listed below as options.
*
* @param callback Callback to execute.
*/
declare function log(callback: (details: LogCallbackObject) => any): any;

/**
* Register a callback to fire whenever a module ends.
*
* @param callback Callback to execute.
*/
declare function moduleDone(callback: (details: ModuleDoneCallbackObject) => any): any;

/**
* Register a callback to fire whenever a module begins.
*
* @param callback Callback to execute.
*/
declare function moduleStart(callback: (name: string) => any): any;

/**
* Register a callback to fire whenever a test ends.
*
* @param callback Callback to execute.
*/
declare function testDone(callback: (details: TestDoneCallbackObject) => any): any;

/**
* Register a callback to fire whenever a test begins.
*
* @param callback Callback to execute.
*/
declare function testStart(callback: (details: TestStartCallbackObject) => any): any;

/* TEST */

/**
* Add an asynchronous test to run. The test must include a call to start().
*
* For testing asynchronous code, asyncTest will automatically stop the test runner
* and wait for your code to call start() to continue.
*
* @param name Title of unit being tested
* @param expected Number of assertions in this test
* @param test Function to close over assertions
*/
declare function asyncTest(name: string, expected?: any, test?: (assert: QUnitAssert) => any): any;

/**
* Add an asynchronous test to run. The test must include a call to start().
*
* For testing asynchronous code, asyncTest will automatically stop the test runner
* and wait for your code to call start() to continue.
*
* @param name Title of unit being tested
* @param test Function to close over assertions
*/
declare function asyncTest(name: string, test: (assert: QUnitAssert) => any): any;

/**
* Specify how many assertions are expected to run within a test.
*
* To ensure that an explicit number of assertions are run within any test, use
* expect( number ) to register an expected count. If the number of assertions
* run does not match the expected count, the test will fail.
*
* @param amount Number of assertions in this test.
* @depricated since version 1.16
*/
declare function expect(amount: number): any;

// ** conflict with TypeScript module keyword. Must be used on QUnit namespace
//declare var module: (name: string, lifecycle?: LifecycleObject) => any;

/**
* Add a test to run.
*
* When testing the most common, synchronous code, use test().
* The assert argument to the callback contains all of QUnit's assertion methods.
* If you are avoiding using any of QUnit's globals, you can use the assert
* argument instead.
*
* @param title Title of unit being tested
* @param expected Number of assertions in this test
* @param test Function to close over assertions
*/
declare function test(title: string, expected: number, test: (assert?: QUnitAssert) => any): any;

/**
* @param title Title of unit being tested
* @param test Function to close over assertions
*/
declare function test(title: string, test: (assert?: QUnitAssert) => any): any;

declare function notPropEqual(actual: any, expected: any, message?: string): any;

declare function propEqual(actual: any, expected: any, message?: string): any;

// https://github.com/jquery/qunit/blob/master/qunit/qunit.js#L1568
declare function equiv(a: any, b: any): any;

// https://github.com/jquery/qunit/blob/master/qunit/qunit.js#L661
declare var raises: any;

/* QUNIT */
declare var QUnit: QUnitStatic;interface ISortable {
	destroy(): void;
	option(name: string, value?: any): any;
}

interface SortableOptions {
	group?: string;
	handle?: string;
	ghostClass?: string;
	draggable?: string;
	animation?: number;
	onSort?: Function;
}

interface SortableStatic {
    create(el: HTMLElement | Node, options?: SortableOptions): ISortable;
}

declare var Sortable: SortableStatic;/* tslint:disable:interface-name */
interface String {
    asDataUri(): string;
    contains(str: string): boolean;
    endsWith(suffix: string): boolean;
    insert(str: string, index: number): string;
    padLeft(width: number, str?: string): string;
    padRight(width: number, str?: string): string;
    startsWith(prefix: string): boolean;
    trimEnd(c: string): string;
    trimStart(c: string): string;
    localeFormat(format: string, useDefault: boolean): string;
}

interface Date {
    netType(value: string);
    netType(): string;

    netOffset(value: string);
    netOffset(): string;
}

interface Number {
	format(format: string): string;
}

interface ExpressionParserStatic {
    alwaysTrue: (count: number) => boolean;
    get(expression: string): (count: number) => boolean;
}

declare var ExpressionParser: ExpressionParserStatic;

interface UniqueStatic {
    get(): string;
}

declare var Unique: UniqueStatic;

interface StringEx {
    isNullOrEmpty(str: string): boolean;
    isNullOrWhiteSpace(str: string): boolean;
    format(format: string, ...args: any[]): string;
}

declare var StringEx: StringEx;


interface BooleanEx {
    parse(str: string): boolean;
}

declare var BooleanEx: BooleanEx;

interface Array<T> {
    remove(s: T): boolean;
    removeAll(f: (t: T) => boolean, thisObject?: any): void;
}

interface BigNumber {
    toNumber(): number;
    equals(value: BigNumber): boolean;
}

declare var BigNumber: {
    new (number: number | string): BigNumber;
};
/* tslint:enable:interface-name */declare var unwrap: <TNode extends Node>(node: TNode) => TNode;

interface Node {
    /**
    * Appends the WebComponent to this component.
    */
    appendChild<TWebComponent extends Vidyano.WebComponents.WebComponent>(component: TWebComponent): TWebComponent;

    /**
    * Appends the Node to this component.
    */
    appendChild<TNode extends Node>(node: TNode): TNode;
}// Type definitions for d3JS
// Project: http://d3js.org/
// Definitions by: Alex Ford <https://github.com/gustavderdrache>, Boris Yankov <https://github.com/borisyankov>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module d3 {
    /**
     * The current version of D3.js.
     */
    export var version: string;

    /**
     * Find the first element that matches the given selector string.
     */
    export function select(selector: string): Selection<any>;

    /**
     * Create a selection from the given node reference.
     */
    export function select(node: EventTarget): Selection<any>;

    /**
     * Find all elements that match the given selector string.
     */
    export function selectAll(selector: string): Selection<any>;

    /**
     * Create a selection from the given list of nodes.
     */
    export function selectAll(nodes: EventTarget[]): Selection<any>;

    /**
     * Returns the root selection (as if by d3.select(document.documentElement)). This function may be used for 'instanceof' tests, and extending its prototype will add properties to all selections.
     */
    export function selection(): Selection<any>;

    module selection {
        export var prototype: Selection<any>;

        /**
         * Selections are grouped into arrays of nodes, with the parent tracked in the 'parentNode' property.
         */
        interface Group extends Array<EventTarget> {
            parentNode: EventTarget;
        }

        interface Update<Datum> {
            /**
             * Retrieve a grouped selection.
             */
            [index: number]: Group;

            /**
             * The number of groups in this selection.
             */
            length: number;

            /**
             * Retrieve the value of the given attribute for the first node in the selection.
             *
             * @param name The attribute name to query. May be prefixed (see d3.ns.prefix).
             */
            attr(name: string): string;

            /**
             * For all nodes, set the attribute to the specified constant value. Use null to remove.
             *
             * @param name The attribute name, optionally prefixed.
             * @param value The attribute value to use. Note that this is coerced to a string automatically.
             */
            attr(name: string, value: Primitive): Update<Datum>;

            /**
             * Derive an attribute value for each node in the selection based on bound data.
             *
             * @param name The attribute name, optionally prefixed.
             * @param value The function of the datum (the bound data item), index (the position in the subgrouping), and outer index (overall position in nested selections) which computes the attribute value. If the function returns null, the attribute is removed.
             */
            attr(name: string, value: (datum: Datum, index: number, outerIndex: number) => Primitive): Update<Datum>;

            /**
             * Set multiple properties at once using an Object. D3 iterates over all enumerable properties and either sets or computes the attribute's value based on the corresponding entry in the Object.
             *
             * @param obj A key-value mapping corresponding to attributes and values. If the value is a simple string or number, it is taken as a constant. Otherwise, it is a function that derives the attribute value.
             */
            attr(obj: { [key: string]: Primitive | ((datum: Datum, index: number, outerIndex: number) => Primitive) }): Update<Datum>;

            /**
             * Returns true if the first node in this selection has the given class list. If multiple classes are specified (i.e., "foo bar"), then returns true only if all classes match.
             *
             * @param name The class list to query.
             */
            classed(name: string): boolean;

            /**
             * Adds (or removes) the given class list.
             *
             * @param name The class list to toggle. Spaces separate class names: "foo bar" is a list of two classes.
             * @param value If true, add the classes. If false, remove them.
             */
            classed(name: string, value: boolean): Update<Datum>;

            /**
             * Determine if the given class list should be toggled for each node in the selection.
             *
             * @param name The class list. Spaces separate multiple class names.
             * @param value The function to run for each node. Should return true to add the class to the node, or false to remove it.
             */
            classed(name: string, value: (datum: Datum, index: number, outerIndex: number) => boolean): Update<Datum>;

            /**
             * Set or derive classes for multiple class lists at once.
             *
             * @param obj An Object mapping class lists to values that are either plain booleans or functions that return booleans.
             */
            classed(obj: { [key: string]: boolean | ((datum: Datum, index: number, outerIndex: number) => boolean) }): Update<Datum>;

            /**
             * Retrieve the computed style value for the first node in the selection.
             * @param name The CSS property name to query
             */
            style(name: string): string;

            /**
             * Set a style property for all nodes in the selection.
             * @param name the CSS property name
             * @param value the property value
             * @param priority if specified, either null or the string "important" (no exclamation mark)
             */
            style(name: string, value: Primitive, priority?: string): Update<Datum>;

            /**
             * Derive a property value for each node in the selection.
             * @param name the CSS property name
             * @param value the function to derive the value
             * @param priority if specified, either null or the string "important" (no exclamation mark)
             */
            style(name: string, value: (datum: Datum, index: number, outerIndex: number) => Primitive, priority?: string): Update<Datum>;

            /**
             * Set a large number of CSS properties from an object.
             *
             * @param obj an Object whose keys correspond to CSS property names and values are either constants or functions that derive property values
             * @param priority if specified, either null or the string "important" (no exclamation mark)
             */
            style(obj: { [key: string]: Primitive | ((datum: Datum, index: number, outerIndex: number) => Primitive) }, priority?: string): Update<Datum>;

            /**
             * Retrieve an arbitrary node property such as the 'checked' property of checkboxes, or the 'value' of text boxes.
             *
             * @param name the node's property to retrieve
             */
            property(name: string): any;

            /**
             * For each node, set the property value. Internally, this sets the node property directly (e.g., node[name] = value), so take care not to mutate special properties like __proto__.
             *
             * @param name the property name
             * @param value the property value
             */
            property(name: string, value: any): Update<Datum>;

            /**
             * For each node, derive the property value. Internally, this sets the node property directly (e.g., node[name] = value), so take care not to mutate special properties like __proto__.
             *
             * @param name the property name
             * @param value the function used to derive the property's value
             */
            property(name: string, value: (datum: Datum, index: number, outerIndex: number) => any): Update<Datum>;

            /**
             * Set multiple node properties. Caveats apply: take care not to mutate special properties like __proto__.
             *
             * @param obj an Object whose keys correspond to node properties and values are either constants or functions that will compute a value.
             */
            property(obj: { [key: string]: any | ((datum: Datum, index: number, outerIndex: number) => any) }): Update<Datum>;

            /**
             * Retrieve the textContent of the first node in the selection.
             */
            text(): string;

            /**
             * Set the textContent of each node in the selection.
             * @param value the text to use for all nodes
             */
            text(value: Primitive): Update<Datum>;

            /**
             * Compute the textContent of each node in the selection.
             * @param value the function which will compute the text
             */
            text(value: (datum: Datum, index: number, outerIndex: number) => Primitive): Update<Datum>;

            /**
             * Retrieve the HTML content of the first node in the selection. Uses 'innerHTML' internally and will not work with SVG or other elements without a polyfill.
             */
            html(): string;

            /**
             * Set the HTML content of every node in the selection. Uses 'innerHTML' internally and thus will not work with SVG or other elements without a polyfill.
             * @param value the HTML content to use.
             */
            html(value: string): Selection<Datum>;

            /**
             * Compute the HTML content for each node in the selection. Uses 'innerHTML' internally and thus will not work with SVG or other elements without a polyfill.
             * @param value the function to compute HTML content
             */
            html(value: (datum: Datum, index: number, outerIndex: number) => string): Selection<Datum>;

            /**
             * Appends a new child to each node in the selection. This child will inherit the parent's data (if available). Returns a fresh selection consisting of the newly-appended children.
             *
             * @param name the element name to append. May be prefixed (see d3.ns.prefix).
             */
            append(name: string): Selection<Datum>;

            /**
             * Appends a new child to each node in the selection by computing a new node. This child will inherit the parent's data (if available). Returns a fresh selection consisting of the newly-appended children.
             *
             * @param name the function to compute a new element
             */
            append(name: (datum: Datum, index: number, outerIndex: number) => EventTarget): Update<Datum>;

            /**
             * Inserts a new child to each node in the selection. This child will inherit its parent's data (if available). Returns a fresh selection consisting of the newly-inserted children.
             * @param name the element name to append. May be prefixed (see d3.ns.prefix).
             * @param before the selector to determine position (e.g., ":first-child")
             */
            insert(name: string, before: string): Update<Datum>;

            /**
             * Inserts a new child to each node in the selection. This child will inherit its parent's data (if available). Returns a fresh selection consisting of the newly-inserted children.
             * @param name the element name to append. May be prefixed (see d3.ns.prefix).
             * @param before a function to determine the node to use as the next sibling
             */
            insert(name: string, before: (datum: Datum, index: number, outerIndex: number) => EventTarget): Update<Datum>;

            /**
             * Inserts a new child to the end of each node in the selection by computing a new node. This child will inherit its parent's data (if available). Returns a fresh selection consisting of the newly-inserted children.
             * @param name the function to compute a new child
             * @param before the selector to determine position (e.g., ":first-child")
             */
            insert(name: (datum: Datum, index: number, outerIndex: number) => EventTarget, before: string): Update<Datum>;

            /**
             * Inserts a new child to the end of each node in the selection by computing a new node. This child will inherit its parent's data (if available). Returns a fresh selection consisting of the newly-inserted children.
             * @param name the function to compute a new child
             * @param before a function to determine the node to use as the next sibling
             */
            insert(name: (datum: Datum, index: number, outerIndex: number) => EventTarget, before: (datum: Datum, index: number, outerIndex: number) => EventTarget): Update<Datum>;

            /**
             * Removes the elements from the DOM. They are in a detached state and may be re-added (though there is currently no dedicated API for doing so).
             */
            remove(): Update<Datum>;

            /**
             * Retrieves the data bound to the first group in this selection.
             */
            data(): Datum[];

            /**
             * Binds data to this selection.
             * @param data the array of data to bind to this selection
             * @param key the optional function to determine the unique key for each piece of data. When unspecified, uses the index of the element.
             */
            data<NewDatum>(data: NewDatum[], key?: (datum: NewDatum, index: number, outerIndex: number) => string): Update<NewDatum>;

            /**
             * Derives data to bind to this selection.
             * @param data the function to derive data. Must return an array.
             * @param key the optional function to determine the unique key for each data item. When unspecified, uses the index of the element.
             */
            data<NewDatum>(data: (datum: Datum, index: number, outerIndex: number) => NewDatum[], key?: (datum: NewDatum, index: number, outerIndex: number) => string): Update<NewDatum>;

            /**
             * Filters the selection, returning only those nodes that match the given CSS selector.
             * @param selector the CSS selector
             */
            filter(selector: string): Update<Datum>;

            /**
             * Filters the selection, returning only those nodes for which the given function returned true.
             * @param selector the filter function
             */
            filter(selector: (datum: Datum, index: number, outerIndex: number) => boolean): Update<Datum>;

            /**
             * Return the data item bound to the first element in the selection.
             */
            datum(): Datum;

            /**
             * Set the data item for each node in the selection.
             * @param value the constant element to use for each node
             */
            datum<NewDatum>(value: NewDatum): Update<NewDatum>;

            /**
             * Derive the data item for each node in the selection. Useful for situations such as the HTML5 'dataset' attribute.
             * @param value the function to compute data for each node
             */
            datum<NewDatum>(value: (datum: Datum, index: number, outerIndex: number) => NewDatum): Update<NewDatum>;

            /**
             * Reorders nodes in the selection based on the given comparator. Nodes are re-inserted into the document once sorted.
             * @param comparator the comparison function, which defaults to d3.ascending
             */
            sort(comparator?: (a: Datum, b: Datum) => number): Update<Datum>;

            /**
             * Reorders nodes in the document to match the selection order. More efficient than calling sort() if the selection is already ordered.
             */
            order(): Update<Datum>;

            /**
             * Returns the listener (if any) for the given event.
             * @param type the type of event to load the listener for. May have a namespace (e.g., ".foo") at the end.
             */
            on(type: string): (datum: Datum, index: number, outerIndex: number) => any;

            /**
             * Adds a listener for the specified event. If one was already registered, it is removed before the new listener is added. The return value of the listener function is ignored.
             * @param type the of event to listen to. May have a namespace (e.g., ".foo") at the end.
             * @param listener an event listener function, or null to unregister
             * @param capture sets the DOM useCapture flag
             */
            on(type: string, listener: (datum: Datum, index: number, outerIndex: number) => any, capture?: boolean): Update<Datum>;

            /**
             * Begins a new transition. Interrupts any active transitions of the same name.
             * @param name the transition name (defaults to "")
             */
            transition(name?: string): Transition<Datum>;

            /**
             * Interrupts the active transition of the provided name. Does not cancel scheduled transitions.
             * @param name the transition name (defaults to "")
             */
            interrupt(name?: string): Update<Datum>;

            /**
             * Creates a subselection by finding the first descendent matching the selector string. Bound data is inherited.
             * @param selector the CSS selector to match against
             */
            select(selector: string): Update<Datum>;

            /**
             * Creates a subselection by using a function to find descendent elements. Bound data is inherited.
             * @param selector the function to find matching descendants
             */
            select(selector: (datum: Datum, index: number, outerIndex: number) => EventTarget): Update<Datum>;

            /**
             * Creates a subselection by finding all descendents that match the given selector. Bound data is not inherited.
             * @param selector the CSS selector to match against
             */
            selectAll(selector: string): Update<Datum>;

            /**
             * Creates a subselection by using a function to find descendent elements. Bound data is not inherited.
             * @param selector the function to find matching descendents
             */
            selectAll(selector: (datum: Datum, index: number, outerIndex: number) => Array<EventTarget> | NodeList): Update<any>;

            /**
             * Invoke the given function for each element in the selection. The return value of the function is ignored.
             * @param func the function to invoke
             */
            each(func: (datum: Datum, index: number, outerIndex: number) => any): Update<Datum>;

            /**
             * Call a function on the selection. sel.call(foo) is equivalent to foo(sel).
             * @param func the function to call on the selection
             * @param args any optional args
             */
            call(func: (sel: Update<Datum>, ...args: any[]) => any, ...args: any[]): Update<Datum>;

            /**
             * Returns true if the current selection is empty.
             */
            empty(): boolean;

            /**
             * Returns the first non-null element in the selection, or null otherwise.
             */
            node(): Node;

            /**
             * Returns the total number of elements in the selection.
             */
            size(): number;

            /**
             * Returns the placeholder nodes for each data element for which no corresponding DOM element was found.
             */
            enter(): Enter<Datum>;

            /**
             * Returns a selection for those DOM nodes for which no new data element was found.
             */
            exit(): Selection<Datum>;
        }

        interface Enter<Datum> {
            append(name: string): Selection<Datum>;
            append(name: (datum: Datum, index: number, outerIndex: number) => EventTarget): Selection<Datum>;

            insert(name: string, before?: string): Selection<Datum>;
            insert(name: string, before: (datum: Datum, index: number, outerIndex: number) => EventTarget): Selection<Datum>;
            insert(name: (datum: Datum, index: number, outerIndex: number) => EventTarget, before?: string): Selection<Datum>;
            insert(name: (datum: Datum, index: number, outerIndex: number) => EventTarget, before: (datum: Datum, index: number, outerIndex: number) => EventTarget): Selection<Datum>;

            select(name: (datum: Datum, index: number, outerIndex: number) => EventTarget): Selection<Datum>;
            call(func: (selection: Enter<Datum>, ...args: any[]) => any, ...args: any[]): Enter<Datum>;
        }
    }

    /**
     * Administrivia: JavaScript primitive types, or "things that toString() predictably".
     */
    export type Primitive = number | string | boolean;

    /**
     * Administrivia: anything with a valueOf(): number method is comparable, so we allow it in numeric operations
     */
    interface Numeric {
        valueOf(): number;
    }

    /**
     * A grouped array of nodes.
     * @param Datum the data bound to this selection.
     */
    interface Selection<Datum> {
        /**
         * Retrieve a grouped selection.
         */
        [index: number]: selection.Group;

        /**
         * The number of groups in this selection.
         */
        length: number;

        /**
         * Retrieve the value of the given attribute for the first node in the selection.
         *
         * @param name The attribute name to query. May be prefixed (see d3.ns.prefix).
         */
        attr(name: string): string;

        /**
         * For all nodes, set the attribute to the specified constant value. Use null to remove.
         *
         * @param name The attribute name, optionally prefixed.
         * @param value The attribute value to use. Note that this is coerced to a string automatically.
         */
        attr(name: string, value: Primitive): Selection<Datum>;

        /**
         * Derive an attribute value for each node in the selection based on bound data.
         *
         * @param name The attribute name, optionally prefixed.
         * @param value The function of the datum (the bound data item), index (the position in the subgrouping), and outer index (overall position in nested selections) which computes the attribute value. If the function returns null, the attribute is removed.
         */
        attr(name: string, value: (datum: Datum, index: number, outerIndex: number) => Primitive): Selection<Datum>;

        /**
         * Set multiple properties at once using an Object. D3 iterates over all enumerable properties and either sets or computes the attribute's value based on the corresponding entry in the Object.
         *
         * @param obj A key-value mapping corresponding to attributes and values. If the value is a simple string or number, it is taken as a constant. Otherwise, it is a function that derives the attribute value.
         */
        attr(obj: { [key: string]: Primitive | ((datum: Datum, index: number, outerIndex: number) => Primitive) }): Selection<Datum>;

        /**
         * Returns true if the first node in this selection has the given class list. If multiple classes are specified (i.e., "foo bar"), then returns true only if all classes match.
         *
         * @param name The class list to query.
         */
        classed(name: string): boolean;

        /**
         * Adds (or removes) the given class list.
         *
         * @param name The class list to toggle. Spaces separate class names: "foo bar" is a list of two classes.
         * @param value If true, add the classes. If false, remove them.
         */
        classed(name: string, value: boolean): Selection<Datum>;

        /**
         * Determine if the given class list should be toggled for each node in the selection.
         *
         * @param name The class list. Spaces separate multiple class names.
         * @param value The function to run for each node. Should return true to add the class to the node, or false to remove it.
         */
        classed(name: string, value: (datum: Datum, index: number, outerIndex: number) => boolean): Selection<Datum>;

        /**
         * Set or derive classes for multiple class lists at once.
         *
         * @param obj An Object mapping class lists to values that are either plain booleans or functions that return booleans.
         */
        classed(obj: { [key: string]: boolean | ((datum: Datum, index: number, outerIndex: number) => boolean) }): Selection<Datum>;

        /**
         * Retrieve the computed style value for the first node in the selection.
         * @param name The CSS property name to query
         */
        style(name: string): string;

        /**
         * Set a style property for all nodes in the selection.
         * @param name the CSS property name
         * @param value the property value
         * @param priority if specified, either null or the string "important" (no exclamation mark)
         */
        style(name: string, value: Primitive, priority?: string): Selection<Datum>;

        /**
         * Derive a property value for each node in the selection.
         * @param name the CSS property name
         * @param value the function to derive the value
         * @param priority if specified, either null or the string "important" (no exclamation mark)
         */
        style(name: string, value: (datum: Datum, index: number, outerIndex: number) => Primitive, priority?: string): Selection<Datum>;

        /**
         * Set a large number of CSS properties from an object.
         *
         * @param obj an Object whose keys correspond to CSS property names and values are either constants or functions that derive property values
         * @param priority if specified, either null or the string "important" (no exclamation mark)
         */
        style(obj: { [key: string]: Primitive | ((datum: Datum, index: number, outerIndex: number) => Primitive) }, priority?: string): Selection<Datum>;

        /**
         * Retrieve an arbitrary node property such as the 'checked' property of checkboxes, or the 'value' of text boxes.
         *
         * @param name the node's property to retrieve
         */
        property(name: string): any;

        /**
         * For each node, set the property value. Internally, this sets the node property directly (e.g., node[name] = value), so take care not to mutate special properties like __proto__.
         *
         * @param name the property name
         * @param value the property value
         */
        property(name: string, value: any): Selection<Datum>;

        /**
         * For each node, derive the property value. Internally, this sets the node property directly (e.g., node[name] = value), so take care not to mutate special properties like __proto__.
         *
         * @param name the property name
         * @param value the function used to derive the property's value
         */
        property(name: string, value: (datum: Datum, index: number, outerIndex: number) => any): Selection<Datum>;

        /**
         * Set multiple node properties. Caveats apply: take care not to mutate special properties like __proto__.
         *
         * @param obj an Object whose keys correspond to node properties and values are either constants or functions that will compute a value.
         */
        property(obj: { [key: string]: any | ((datum: Datum, index: number, innerInder: number) => any) }): Selection<Datum>;

        /**
         * Retrieve the textContent of the first node in the selection.
         */
        text(): string;

        /**
         * Set the textContent of each node in the selection.
         * @param value the text to use for all nodes
         */
        text(value: Primitive): Selection<Datum>;

        /**
         * Compute the textContent of each node in the selection.
         * @param value the function which will compute the text
         */
        text(value: (datum: Datum, index: number, outerIndex: number) => Primitive): Selection<Datum>;

        /**
         * Retrieve the HTML content of the first node in the selection. Uses 'innerHTML' internally and will not work with SVG or other elements without a polyfill.
         */
        html(): string;

        /**
         * Set the HTML content of every node in the selection. Uses 'innerHTML' internally and thus will not work with SVG or other elements without a polyfill.
         * @param value the HTML content to use.
         */
        html(value: string): Selection<Datum>;

        /**
         * Compute the HTML content for each node in the selection. Uses 'innerHTML' internally and thus will not work with SVG or other elements without a polyfill.
         * @param value the function to compute HTML content
         */
        html(value: (datum: Datum, index: number, outerIndex: number) => string): Selection<Datum>;

        /**
         * Appends a new child to each node in the selection. This child will inherit the parent's data (if available). Returns a fresh selection consisting of the newly-appended children.
         *
         * @param name the element name to append. May be prefixed (see d3.ns.prefix).
         */
        append(name: string): Selection<Datum>;

        /**
         * Appends a new child to each node in the selection by computing a new node. This child will inherit the parent's data (if available). Returns a fresh selection consisting of the newly-appended children.
         *
         * @param name the function to compute a new element
         */
        append(name: (datum: Datum, index: number, outerIndex: number) => EventTarget): Selection<Datum>;

        /**
         * Inserts a new child to each node in the selection. This child will inherit its parent's data (if available). Returns a fresh selection consisting of the newly-inserted children.
         * @param name the element name to append. May be prefixed (see d3.ns.prefix).
         * @param before the selector to determine position (e.g., ":first-child")
         */
        insert(name: string, before: string): Selection<Datum>;

        /**
         * Inserts a new child to each node in the selection. This child will inherit its parent's data (if available). Returns a fresh selection consisting of the newly-inserted children.
         * @param name the element name to append. May be prefixed (see d3.ns.prefix).
         * @param before a function to determine the node to use as the next sibling
         */
        insert(name: string, before: (datum: Datum, index: number, outerIndex: number) => EventTarget): Selection<Datum>;

        /**
         * Inserts a new child to the end of each node in the selection by computing a new node. This child will inherit its parent's data (if available). Returns a fresh selection consisting of the newly-inserted children.
         * @param name the function to compute a new child
         * @param before the selector to determine position (e.g., ":first-child")
         */
        insert(name: (datum: Datum, index: number, outerIndex: number) => EventTarget, before: string): Selection<Datum>;

        /**
         * Inserts a new child to the end of each node in the selection by computing a new node. This child will inherit its parent's data (if available). Returns a fresh selection consisting of the newly-inserted children.
         * @param name the function to compute a new child
         * @param before a function to determine the node to use as the next sibling
         */
        insert(name: (datum: Datum, index: number, outerIndex: number) => EventTarget, before: (datum: Datum, index: number, outerIndex: number) => EventTarget): Selection<Datum>;

        /**
         * Removes the elements from the DOM. They are in a detached state and may be re-added (though there is currently no dedicated API for doing so).
         */
        remove(): Selection<Datum>;

        /**
         * Retrieves the data bound to the first group in this selection.
         */
        data(): Datum[];

        /**
         * Binds data to this selection.
         * @param data the array of data to bind to this selection
         * @param key the optional function to determine the unique key for each piece of data. When unspecified, uses the index of the element.
         */
        data<NewDatum>(data: NewDatum[], key?: (datum: NewDatum, index: number, outerIndex: number) => string): selection.Update<NewDatum>;

        /**
         * Derives data to bind to this selection.
         * @param data the function to derive data. Must return an array.
         * @param key the optional function to determine the unique key for each data item. When unspecified, uses the index of the element.
         */
        data<NewDatum>(data: (datum: Datum, index: number, outerIndex: number) => NewDatum[], key?: (datum: NewDatum, index: number, outerIndex: number) => string): selection.Update<NewDatum>;

        /**
         * Filters the selection, returning only those nodes that match the given CSS selector.
         * @param selector the CSS selector
         */
        filter(selector: string): Selection<Datum>;

        /**
         * Filters the selection, returning only those nodes for which the given function returned true.
         * @param selector the filter function
         */
        filter(selector: (datum: Datum, index: number, outerIndex: number) => boolean): Selection<Datum>;

        /**
         * Return the data item bound to the first element in the selection.
         */
        datum(): Datum;

        /**
         * Derive the data item for each node in the selection. Useful for situations such as the HTML5 'dataset' attribute.
         * @param value the function to compute data for each node
         */
        datum<NewDatum>(value: (datum: Datum, index: number, outerIndex: number) => NewDatum): Selection<NewDatum>;

        /**
         * Set the data item for each node in the selection.
         * @param value the constant element to use for each node
         */
        datum<NewDatum>(value: NewDatum): Selection<NewDatum>;

        /**
         * Reorders nodes in the selection based on the given comparator. Nodes are re-inserted into the document once sorted.
         * @param comparator the comparison function, which defaults to d3.ascending
         */
        sort(comparator?: (a: Datum, b: Datum) => number): Selection<Datum>;

        /**
         * Reorders nodes in the document to match the selection order. More efficient than calling sort() if the selection is already ordered.
         */
        order(): Selection<Datum>;

        /**
         * Returns the listener (if any) for the given event.
         * @param type the type of event to load the listener for. May have a namespace (e.g., ".foo") at the end.
         */
        on(type: string): (datum: Datum, index: number, outerIndex: number) => any;

        /**
         * Adds a listener for the specified event. If one was already registered, it is removed before the new listener is added. The return value of the listener function is ignored.
         * @param type the of event to listen to. May have a namespace (e.g., ".foo") at the end.
         * @param listener an event listener function, or null to unregister
         * @param capture sets the DOM useCapture flag
         */
        on(type: string, listener: (datum: Datum, index: number, outerIndex: number) => any, capture?: boolean): Selection<Datum>;

        /**
         * Begins a new transition. Interrupts any active transitions of the same name.
         * @param name the transition name (defaults to "")
         */
        transition(name?: string): Transition<Datum>;

        /**
         * Interrupts the active transition of the provided name. Does not cancel scheduled transitions.
         * @param name the transition name (defaults to "")
         */
        interrupt(name?: string): Selection<Datum>;

        /**
         * Creates a subselection by finding the first descendent matching the selector string. Bound data is inherited.
         * @param selector the CSS selector to match against
         */
        select(selector: string): Selection<Datum>;

        /**
         * Creates a subselection by using a function to find descendent elements. Bound data is inherited.
         * @param selector the function to find matching descendants
         */
        select(selector: (datum: Datum, index: number, outerIndex: number) => EventTarget): Selection<Datum>;

        /**
         * Creates a subselection by finding all descendents that match the given selector. Bound data is not inherited.
         * @param selector the CSS selector to match against
         */
        selectAll(selector: string): Selection<any>;

        /**
         * Creates a subselection by finding all descendants that match the given selector. Bound data is not inherited.
         *
         * Use this overload when data-binding a subselection (that is, sel.selectAll('.foo').data(d => ...)). The type will carry over.
         */
        selectAll<T>(selector: string): Selection<T>;

        /**
         * Creates a subselection by using a function to find descendent elements. Bound data is not inherited.
         * @param selector the function to find matching descendents
         */
        selectAll(selector: (datum: Datum, index: number, outerIndex: number) => Array<EventTarget> | NodeList): Selection<any>;

        /**
         * Creates a subselection by using a function to find descendent elements. Bound data is not inherited.
         *
         * Use this overload when data-binding a subselection (that is, sel.selectAll('.foo').data(d => ...)). The type will carry over.
         * @param selector the function to find matching descendents
         */
        selectAll<T>(selector: (datum: Datum, index: number, outerIndex: number) => Array<EventTarget> | NodeList): Selection<T>;

        /**
         * Invoke the given function for each element in the selection. The return value of the function is ignored.
         * @param func the function to invoke
         */
        each(func: (datum: Datum, index: number, outerIndex: number) => any): Selection<Datum>;

        /**
         * Call a function on the selection. sel.call(foo) is equivalent to foo(sel).
         * @param func the function to call on the selection
         * @param args any optional args
         */
        call(func: (sel: Selection<Datum>, ...args: any[]) => any, ...args: any[]): Selection<Datum>;

        /**
         * Returns true if the current selection is empty.
         */
        empty(): boolean;

        /**
         * Returns the first non-null element in the selection, or null otherwise.
         */
        node(): EventTarget;

        /**
         * Returns the total number of elements in the selection.
         */
        size(): number;
    }

    export function transition(): Transition<any>;
    module transition {
        export var prototype: Transition<any>;
    }

    interface Transition<Datum> {

        transition(): Transition<Datum>;

        delay(): number;
        delay(delay: number): Transition<Datum>;
        delay(delay: (datum: Datum, index: number, outerIndex: number) => number): Transition<Datum>;

        duration(): number;
        duration(duration: number): Transition<Datum>;
        duration(duration: (datum: Datum, index: number, outerIndex: number) => number): Transition<Datum>;

        ease(): (t: number) => number;
        ease(value: string, ...args: any[]): Transition<Datum>;
        ease(value: (t: number) => number): Transition<Datum>;

        attr(name: string, value: Primitive): Transition<Datum>;
        attr(name: string, value: (datum: Datum, index: number, outerIndex: number) => Primitive): Transition<Datum>;
        attr(obj: { [key: string]: Primitive | ((datum: Datum, index: number, outerIndex: number) => Primitive) }): Transition<Datum>;

        attrTween(name: string, tween: (datum: Datum, index: number, attr: string) => (t: number) => Primitive): Transition<Datum>;

        style(name: string, value: Primitive, priority?: string): Transition<Datum>;
        style(name: string, value: (datum: Datum, index: number, outerIndex: number) => Primitive, priority?: string): Transition<Datum>;
        style(obj: { [key: string]: Primitive | ((datum: Datum, index: number, outerIndex: number) => Primitive) }, priority?: string): Transition<Datum>;

        styleTween(name: string, tween: (datum: Datum, index: number, attr: string) => (t: number) => Primitive, priority?: string): Transition<Datum>;

        text(value: Primitive): Transition<Datum>;
        text(value: (datum: Datum, index: number, outerIndex: number) => Primitive): Transition<Datum>;

        tween(name: string, factory: () => (t: number) => any): Transition<Datum>;

        remove(): Transition<Datum>;

        select(selector: string): Transition<Datum>;
        select(selector: (d: Datum, i: number) => EventTarget): Transition<Datum>;

        selectAll(selector: string): Transition<any>;
        selectAll(selector: (d: Datum, i: number) => EventTarget[]): Transition<any>;

        filter(selector: string): Transition<Datum>;
        filter(selector: (d: Datum, i: number) => boolean): Transition<Datum>;

        each(type: string, listener: (d: Datum, i: number) => any): Transition<Datum>;
        each(listener: (d: Datum, i: number) => any): Transition<Datum>;

        call(func: (transition: Transition<Datum>, ...args: any[]) => any, ...args: any[]): Transition<Datum>;

        empty(): boolean;
        node(): EventTarget;
        size(): number;
    }

    export function ease(type: 'linear'): (t: number) => number;
    export function ease(type: 'linear-in'): (t: number) => number;
    export function ease(type: 'linear-out'): (t: number) => number;
    export function ease(type: 'linear-in-out'): (t: number) => number;
    export function ease(type: 'linear-out-in'): (t: number) => number;

    export function ease(type: 'poly', k: number): (t: number) => number;
    export function ease(type: 'poly-in', k: number): (t: number) => number;
    export function ease(type: 'poly-out', k: number): (t: number) => number;
    export function ease(type: 'poly-in-out', k: number): (t: number) => number;
    export function ease(type: 'poly-out-in', k: number): (t: number) => number;

    export function ease(type: 'quad'): (t: number) => number;
    export function ease(type: 'quad-in'): (t: number) => number;
    export function ease(type: 'quad-out'): (t: number) => number;
    export function ease(type: 'quad-in-out'): (t: number) => number;
    export function ease(type: 'quad-out-in'): (t: number) => number;

    export function ease(type: 'cubic'): (t: number) => number;
    export function ease(type: 'cubic-in'): (t: number) => number;
    export function ease(type: 'cubic-out'): (t: number) => number;
    export function ease(type: 'cubic-in-out'): (t: number) => number;
    export function ease(type: 'cubic-out-in'): (t: number) => number;

    export function ease(type: 'sin'): (t: number) => number;
    export function ease(type: 'sin-in'): (t: number) => number;
    export function ease(type: 'sin-out'): (t: number) => number;
    export function ease(type: 'sin-in-out'): (t: number) => number;
    export function ease(type: 'sin-out-in'): (t: number) => number;

    export function ease(type: 'circle'): (t: number) => number;
    export function ease(type: 'circle-in'): (t: number) => number;
    export function ease(type: 'circle-out'): (t: number) => number;
    export function ease(type: 'circle-in-out'): (t: number) => number;
    export function ease(type: 'circle-out-in'): (t: number) => number;

    export function ease(type: 'elastic', a?: number, b?: number): (t: number) => number;
    export function ease(type: 'elastic-in', a?: number, b?: number): (t: number) => number;
    export function ease(type: 'elastic-out', a?: number, b?: number): (t: number) => number;
    export function ease(type: 'elastic-in-out', a?: number, b?: number): (t: number) => number;
    export function ease(type: 'elastic-out-in', a?: number, b?: number): (t: number) => number;

    export function ease(type: 'back', s: number): (t: number) => number;
    export function ease(type: 'back-in', s: number): (t: number) => number;
    export function ease(type: 'back-out', s: number): (t: number) => number;
    export function ease(type: 'back-in-out', s: number): (t: number) => number;
    export function ease(type: 'back-out-in', s: number): (t: number) => number;

    export function ease(type: 'bounce'): (t: number) => number;
    export function ease(type: 'bounce-in'): (t: number) => number;
    export function ease(type: 'bounce-out'): (t: number) => number;
    export function ease(type: 'bounce-in-out'): (t: number) => number;
    export function ease(type: 'bounce-out-in'): (t: number) => number;

    export function ease(type: string, ...args: any[]): (t: number) => number;

    export function timer(func: () => any, delay?: number, time?: number): void;

    module timer {
        export function flush(): void;
    }

	 interface BaseEvent {
		 type: string;
		 sourceEvent?: Event;
	 }

	 /**
	  * Define a D3-specific ZoomEvent per https://github.com/mbostock/d3/wiki/Zoom-Behavior#event
	  */
	 interface ZoomEvent extends BaseEvent {
		 scale: number;
		 translate: [number, number];
	 }

	 /**
	  * Define a D3-specific DragEvent per https://github.com/mbostock/d3/wiki/Drag-Behavior#on
	  */
	 interface DragEvent extends BaseEvent {
		 x: number;
		 y: number;
		 dx: number;
		 dy: number;
	 }

    /**
     * The current event's value. Use this variable in a handler registered with `selection.on`.
     */
    export var event: Event | BaseEvent;

    /**
     * Returns the x and y coordinates of the mouse relative to the provided container element, using d3.event for the mouse's position on the page.
     * @param container the container element (e.g. an SVG <g> element)
     */
    export function mouse(container: EventTarget): [number, number];

    /**
     * Given a container element and a touch identifier, determine the x and y coordinates of the touch.
     * @param container the container element (e.g., an SVG <svg> element)
     * @param identifier the given touch identifier
     */
    export function touch(container: EventTarget, identifer: number): [number, number];

    /**
     * Given a container element, a list of touches, and a touch identifier, determine the x and y coordinates of the touch.
     * @param container the container element (e.g., an SVG <svg> element)
     * @param identifier the given touch identifier
     */
    export function touch(container: EventTarget, touches: TouchList, identifer: number): [number, number];

    /**
     * Given a container element and an optional list of touches, return the position of every touch relative to the container.
     * @param container the container element
     * @param touches an optional list of touches (defaults to d3.event.touches)
     */
    export function touches(container: EventTarget, touches?: TouchList): Array<[number, number]>;

    // NB. this is limited to primitive values due to D3's use of the <, >, and >= operators. Results get weird for object instances.
    /**
     * Compares two primitive values for sorting (in ascending order).
     */
    export function ascending(a: Primitive, b: Primitive): number;

    /**
     * Compares two primitive values for sorting (in ascending order).
     */
    export function descending(a: Primitive, b: Primitive): number;

    /**
     * Return the minimum value in the array using natural order.
     */
    export function min(array: number[]): number;

    /**
     * Return the minimum value in the array using natural order.
     */
    export function min(array: string[]): string;

    /**
     * Return the minimum value in the array using natural order.
     */
    export function min<T extends Numeric>(array: T[]): T;

    /**
     * Return the minimum value in the array using natural order.
     */
    export function min<T>(array: T[], accessor: (datum: T, index: number) => number): number;

    /**
     * Return the minimum value in the array using natural order.
     */
    export function min<T>(array: T[], accessor: (datum: T, index: number) => string): string;

    /**
     * Return the minimum value in the array using natural order.
     */
    export function min<T, U extends Numeric>(array: T[], accessor: (datum: T, index: number) => U): U;

    /**
     * Return the maximum value in the array of numbers using natural order.
     */
    export function max(array: number[]): number;

    /**
     * Return the maximum value in the array of strings using natural order.
     */
    export function max(array: string[]): string;

    /**
     * Return the maximum value in the array of numbers using natural order.
     */
    export function max<T extends Numeric>(array: T[]): T;

    /**
     * Return the maximum value in the array using natural order and a projection function to map values to numbers.
     */
    export function max<T>(array: T[], accessor: (datum: T, index: number) => number): number;

    /**
     * Return the maximum value in the array using natural order and a projection function to map values to strings.
     */
    export function max<T>(array: T[], accessor: (datum: T, index: number) => string): string;

    /**
     * Return the maximum value in the array using natural order and a projection function to map values to easily-sorted values.
     */
    export function max<T, U extends Numeric>(array: T[], accessor: (datum: T, index: number) => U): U;

    /**
     * Return the min and max simultaneously.
     */
    export function extent(array: number[]): [number, number];

    /**
     * Return the min and max simultaneously.
     */
    export function extent(array: string[]): [string, string];

    /**
     * Return the min and max simultaneously.
     */
    export function extent<T extends Numeric>(array: T[]): [T, T];

    /**
     * Return the min and max simultaneously.
     */
    export function extent<T extends Numeric>(array: Array<T | Primitive>): [T | Primitive, T | Primitive];

    /**
     * Return the min and max simultaneously.
     */
    export function extent<T>(array: T[], accessor: (datum: T, index: number) => number): [number, number];

    /**
     * Return the min and max simultaneously.
     */
    export function extent<T>(array: T[], accessor: (datum: T, index: number) => string): [string, string];

    /**
     * Return the min and max simultaneously.
     */
    export function extent<T, U extends Numeric>(array: U[], accessor: (datum: T, index: number) => U): [U | Primitive, U | Primitive];

    /**
     * Compute the sum of an array of numbers.
     */
    export function sum(array: number[]): number;

    /**
     * Compute the sum of an array, using the given accessor to convert values to numbers.
     */
    export function sum<T>(array: T[], accessor: (datum: T, index: number) => number): number;

    export function mean(array: number[]): number;
    export function mean<T>(array: T[], accessor: (datum: T, index: number) => number): number;

    export function quantile(array: number[], p: number): number;

    export function variance(array: number[]): number;
    export function variance<T>(array: T[], accessor: (datum: T, index: number) => number): number;

    export function deviation(array: number[]): number;
    export function deviation<T>(array: T[], accessor: (datum: T, index: number) => number): number;

    export function bisectLeft(array: number[], x: number, lo?: number, hi?: number): number;
    export function bisectLeft(array: string[], x: string, lo?: number, hi?: number): number;

    export var bisect: typeof bisectRight;

    export function bisectRight<T>(array: T[], x: T, lo?: number, hi?: number): number;

    export function bisector<T, U>(accessor: (x: T) => U): {
        left: (array: T[], x: U, lo?: number, hi?: number) => number;
        right: (array: T[], x: U, lo?: number, hi?: number) => number;
    }

    export function bisector<T, U>(comparator: (a: T, b: U) => number): {
        left: (array: T[], x: U, lo?: number, hi?: number) => number;
        right: (array: T[], x: U, lo?: number, hi?: number) => number;
    }

    export function shuffle<T>(array: T[], lo?: number, hi?: number): T[];

    /**
     * Returns the enumerable property names of the specified object.
     * @param object a JavaScript object
     */
    export function keys(object: Object): string[];

    /**
     * Returns an array containing the property values of the specified object.
     */
    export function values<T>(object: { [key: string]: T }): T[];
    /**
     * Returns an array containing the property values of the specified object.
     */
    export function values<T>(object: { [key: number]: T }): T[];
    /**
     * Returns an array containing the property values of the specified object.
     */
    export function values(object: Object): any[];

    /**
     * Returns an array of key-value pairs containing the property values of the specified object.
     */
    export function entries<T>(object: { [key: string]: T }): { key: string; value: T }[];

    /**
     * Returns an array of key-value pairs containing the property values of the specified object.
     */
    export function entries<T>(object: { [key: number]: T }): { key: string; value: T }[];

    /**
     * Returns an array of key-value pairs containing the property values of the specified object.
     */
    export function entries(object: Object): { key: string; value: any }[];

    /**
     * A shim for ES6 maps. The implementation uses a JavaScript object internally, and thus keys are limited to strings.
     */
    interface Map<T> {
        /**
         * Does the map contain the given key?
         */
        has(key: string): boolean;

        /**
         * Retrieve the value for the given key. Returns undefined if there is no value stored.
         */
        get(key: string): T;

        /**
         * Set the value for the given key. Returns the new value.
         */
        set(key: string, value: T): T;

        /**
         * Remove the value for the given key. Returns true if there was a value and false otherwise.
         */
        remove(key: string): boolean;

        /**
         * Returns an array of all keys in arbitrary order.
         */
        keys(): string[];

        /**
         * Returns an array of all values in arbitrary order.
         */
        values(): T[];

        /**
         * Returns an array of key-value objects in arbitrary order.
         */
        entries(): { key: string; value: T }[];

        /**
         * Calls the function for each key and value pair in the map. The 'this' context is the map itself.
         */
        forEach(func: (key: string, value: T) => any): void;

        /**
         * Is this map empty?
         */
        empty(): boolean;

        /**
         * Returns the number of elements stored in the map.
         */
        size(): number;
    }

    /**
     * Constructs an initially empty map.
     */
    export function map<T>(): Map<T>;

    /**
     * Construct a new map by copying keys and values from the given one.
     */
    export function map<T>(object: Map<T>): Map<T>;

    /**
     * Construct a new map by copying enumerable properties and values from the given object.
     */
    export function map<T>(object: { [key: string]: T }): Map<T>;

    /**
     * Construct a new map by copying enumerable properties and values from the given object.
     */
    export function map<T>(object: { [key: number]: T }): Map<T>;

    /**
     * Construct a new map by copying elements from the array. The key function is used to identify each object.
     */
    export function map<T>(array: T[], key: (datum: T, index: number) => string): Map<T>;

    /**
     * Construct a new map by copying enumerable properties and values from the given object.
     */
    export function map(object: Object): Map<any>;

    /**
     * A shim for ES6 sets. Is only able to store strings.
     */
    interface Set {
        /**
         * Is the given string stored in this set?
         */
        has(value: string): boolean;

        /**
         * Add the string to this set. Returns the value.
         */
        add(value: string): string;

        /**
         * Remove the given value from the set. Returns true if it was stored, and false otherwise.
         */
        remove(value: string): boolean;

        /**
         * Returns an array of the strings stored in this set.
         */
        values(): string[];

        /**
         * Calls a given function for each value in the set. The return value of the function is ignored. The this context of the function is the set itself.
         */
        forEach(func: (value: string) => any): void;

        /**
         * Is this set empty?
         */
        empty(): boolean;

        /**
         * Returns the number of values stored in this set.
         */
        size(): number;
    }

    /**
     * Creates an initially-empty set.
     */
    export function set(): Set;

    /**
     * Initializes a set from the given array of strings.
     */
    export function set(array: string[]): Set;

    /**
     * Merges the specified arrays into a single array.
     */
    export function merge<T>(arrays: T[][]): T[];

    /**
     * Generates a 0-based numeric sequence. The output range does not include 'stop'.
     */
    export function range(stop: number): number[];

    /**
     * Generates a numeric sequence starting from the given start and stop values. 'step' defaults to 1. The output range does not include 'stop'.
     */
    export function range(start: number, stop: number, step?: number): number[];

    /**
     * Given the specified array, return an array corresponding to the list of indices in 'keys'.
     */
    export function permute<T>(array: { [key: number]: T }, keys: number[]): T[];

    /**
     * Given the specified object, return an array corresponding to the list of property names in 'keys'.
     */
    export function permute<T>(object: { [key: string]: T }, keys: string[]): T[];

    // TODO construct n-tuples from n input arrays
    export function zip<T>(...arrays: T[][]): T[][];

    export function transpose<T>(matrix: T[][]): T[][];

    /**
     * For each adjacent pair of elements in the specified array, returns a new array of tuples of elements i and i - 1.
     * Returns the empty array if the input array has fewer than two elements.
     */
    export function pairs<T>(array: T[]): Array<[T, T]>;

    interface Nest<T> {
        key(func: (datum: T) => string): Nest<T>;
        sortKeys(comparator: (a: string, b: string) => number): Nest<T>;
        sortValues(comparator: (a: T, b: T) => number): Nest<T>;
        rollup<U>(func: (values: T[]) => U): Nest<T>;
        map(array: T[]): { [key: string]: any };
        map(array: T[], mapType: typeof d3.map): Map<any>;
        entries(array: T[]): { key: string; values: any }[];
    }

    export function nest<T>(): Nest<T>;

    export module random {
        export function normal(mean?: number, deviation?: number): () => number;
        export function logNormal(mean?: number, deviation?: number): () => number;
        export function bates(count: number): () => number;
        export function irwinHall(count: number): () => number;
    }

    interface Transform {
        rotate: number;
        translate: [number, number];
        skew: number;
        scale: [number, number];
        toString(): string;
    }

    export function transform(transform: string): Transform;

    export function format(specifier: string): (n: number) => string;

    interface FormatPrefix {
        symbol: string;
        scale(n: number): number;
    }

    export function formatPrefix(value: number, precision?: number): FormatPrefix;

    export function round(x: number, n?: number): number;

    export function requote(string: string): string;

    export var rgb: {
        new (r: number, g: number, b: number): Rgb;
        new (color: string): Rgb;

        (r: number, g: number, b: number): Rgb;
        (color: string): Rgb;
    };

    interface Rgb extends Color {
        r: number;
        g: number;
        b: number;

        brighter(k?: number): Rgb;
        darker(k?: number): Rgb;

        hsl(): Hsl;

        toString(): string;
    }

    export var hsl: {
        new (h: number, s: number, l: number): Hsl;
        new (color: string): Hsl;

        (h: number, s: number, l: number): Hsl;
        (color: string): Hsl;
    };

    interface Hsl extends Color {
        h: number;
        s: number;
        l: number;

        brighter(k?: number): Hsl;
        darker(k?: number): Hsl;

        rgb(): Rgb;

        toString(): string;
    }

    export var hcl: {
        new (h: number, c: number, l: number): Hcl;
        new (color: string): Hcl;

        (h: number, c: number, l: number): Hcl;
        (color: string): Hcl;
    };

    interface Hcl extends Color {
        h: number;
        c: number;
        l: number;

        brighter(k?: number): Hcl;
        darker(k?: number): Hcl;
    }

    export var lab: {
        new (l: number, a: number, b: number): Lab;
        new (color: string): Lab;

        (l: number, a: number, b: number): Lab;
        (color: string): Lab;
    }

    interface Lab extends Color {
        l: number;
        a: number;
        b: number;

        brighter(k?: number): Lab;
        darker(k?: number): Lab;

        rgb(): Rgb;
        toString(): string;
    }

    export var color: {
        (): Color;
        new (): Color;
    };

    interface Color {
        rgb(): Rgb;
    }

    export module ns {
        interface Qualified {
            space: string;
            local: string;
        }

        export var prefix: { [key: string]: string };
        export function qualify(name: string): Qualified | string;
    }

    export function functor<T extends Function>(value: T): T;
    export function functor<T>(value: T): () => T;

    export function rebind(target: {}, source: {}, ...names: string[]): any;

    export function dispatch(...names: string[]): Dispatch;

    interface Dispatch {
        on(type: string): (...args: any[]) => void;
        on(type: string, listener: (...args: any[]) => any): Dispatch;
        [event: string]: (...args: any[]) => void;
    }

    export module scale {
        export function identity(): Identity;

        interface Identity {
            (n: number): number;
            invert(n: number): number;

            domain(): number[];
            domain(numbers: number[]): Identity;

            range(): number[];
            range(numbers: number[]): Identity;

            ticks(count?: number): number[];

            tickFormat(count?: number, format?: string): (n: number) => string;

            copy(): Identity;
        }

        export function linear(): Linear<number, number>;
        export function linear<Output>(): Linear<Output, Output>;
        export function linear<Range, Output>(): Linear<Range, Output>;

        interface Linear<Range, Output> {
            (x: number): Output;
            invert(y: number): number;

            domain(): number[];
            domain(numbers: number[]): Linear<Range, Output>;

            range(): Range[];
            range(values: Range[]): Linear<Range, Output>;

            rangeRound(values: number[]): Linear<number, number>;

            interpolate(): (a: Range, b: Range) => (t: number) => Output;
            interpolate(factory: (a: Range, b: Range) => (t: number) => Output): Linear<Range, Output>;

            clamp(): boolean;
            clamp(clamp: boolean): Linear<Range, Output>;

            nice(count?: number): Linear<Range, Output>;

            ticks(count?: number): number[];

            tickFormat(count?: number, format?: string): (n: number) => string;

            copy(): Linear<Range, Output>;
        }

        export function sqrt(): Pow<number, number>;
        export function sqrt<Output>(): Pow<Output, Output>;
        export function sqrt<Range, Output>(): Pow<Range, Output>;

        export function pow(): Pow<number, number>;
        export function pow<Output>(): Pow<Output, Output>;
        export function pow<Range, Output>(): Pow<Range, Output>;

        interface Pow<Range, Output> {
            (x: number): Output;

            invert(y: number): number;

            domain(): number[];
            domain(numbers: number[]): Pow<Range, Output>;

            range(): Range[];
            range(values: Range[]): Pow<Range, Output>;

            rangeRound(values: number[]): Pow<number, number>;

            exponent(): number;
            exponent(k: number): Pow<Range, Output>;

            interpolate(): (a: Range, b: Range) => (t: number) => Output;
            interpolate(factory: (a: Range, b: Range) => (t: number) => Output): Pow<Range, Output>;

            clamp(): boolean;
            clamp(clamp: boolean): Pow<Range, Output>;

            nice(m?: number): Pow<Range, Output>;

            ticks(count?: number): number[];

            tickFormat(count?: number, format?: string): (n: number) => string;

            copy(): Pow<Range, Output>;
        }

        export function log(): Log<number, number>;
        export function log<Output>(): Log<Output, Output>;
        export function log<Range, Output>(): Log<Range, Output>;

        interface Log<Range, Output> {
            (x: number): Output;

            invert(y: number): number;

            domain(): number[];
            domain(numbers: number[]): Log<Range, Output>;

            range(): Range[];
            range(values: Range[]): Log<Range, Output>;

            rangeRound(values: number[]): Log<number, number>;

            base(): number;
            base(base: number): Log<Range, Output>;

            interpolate(): (a: Range, b: Range) => (t: number) => Output;
            interpolate(factory: (a: Range, b: Range) => (t: number) => Output): Log<Range, Output>;

            clamp(): boolean;
            clamp(clamp: boolean): Log<Range, Output>;

            nice(): Log<Range, Output>;

            ticks(): number[];

            tickFormat(count?: number, format?: string): (t: number) => string;

            copy(): Log<Range, Output>;
        }

        export function quantize<T>(): Quantize<T>;

        interface Quantize<T> {
            (x: number): T;

            invertExtent(y: T): [number, number];

            domain(): number[];
            domain(numbers: number[]): Quantize<T>;

            range(): T[];
            range(values: T[]): Quantize<T>;

            copy(): Quantize<T>;
        }

        export function quantile<T>(): Quantile<T>;

        interface Quantile<T> {
            (x: number): T;

            invertExtent(y: T): [number, number];

            domain(): number[];
            domain(numbers: number[]): Quantile<T>;

            range(): T[];
            range(values: T[]): Quantile<T>;

            quantiles(): number[];

            copy(): Quantile<T>;
        }

        export function threshold<Range>(): Threshold<number, Range>;
        export function threshold<Domain, Range>(): Threshold<Domain, Range>;

        interface Threshold<Domain, Range> {
            (x: number): Range;

            invertExtent(y: Range): [Domain, Domain];

            domain(): Domain[];
            domain(domain: Domain[]): Threshold<Domain, Range>;

            range(): Range[];
            range(values: Range[]): Threshold<Domain, Range>;

            copy(): Threshold<Domain, Range>;
        }

        export function ordinal<Range>(): Ordinal<string, Range>;
        export function ordinal<Domain extends { toString(): string }, Range>(): Ordinal<Domain, Range>;
        export function category10(): Ordinal<string, string>;
        export function category10<Domain extends { toString(): string }>(): Ordinal<Domain, string>;
        export function category20(): Ordinal<string, string>;
        export function category20<Domain extends { toString(): string }>(): Ordinal<Domain, string>;
        export function category20b(): Ordinal<string, string>;
        export function category20b<Domain extends { toString(): string }>(): Ordinal<Domain, string>;
        export function category20c(): Ordinal<string,string>;
        export function category20c<Domain extends { toString(): string }>(): Ordinal<Domain, string>;

        interface Ordinal<Domain extends { toString(): string }, Range> {
            (x: Domain): Range;

            domain(): Domain[];
            domain(values: Domain[]): Ordinal<Domain, Range>;

            range(): Range[];
            range(values: Range[]): Ordinal<Domain, Range>;

            rangePoints(interval: [number, number], padding?: number): Ordinal<Domain, number>;
            rangeRoundPoints(interval: [number, number], padding?: number): Ordinal<Domain, number>;

            rangeBands(interval: [number, number], padding?: number, outerPadding?: number): Ordinal<Domain, number>;
            rangeRoundBands(interval: [number, number], padding?: number, outerPadding?: number): Ordinal<Domain, number>;

            rangeBand(): number;
            rangeExtent(): [number, number];

            copy(): Ordinal<Domain, Range>;
        }
    }

    export function interpolate(a: number, b: number): (t: number) => number;
    export function interpolate(a: string, b: string): (t: number) => string;
    export function interpolate(a: string | Color, b: Color): (t: number) => string;
    export function interpolate(a: Array<string | Color>, b: Color[]): (t: number) => string;
    export function interpolate<Range, Output>(a: Range[], b: Output[]): (t: number) => Output[];
    export function interpolate<Range, Output>(a: Range[], b: Range[]): (t: number) => Output[];
    export function interpolate(a: { [key: string]: string | Color }, b: { [key: string]: Color }): (t: number) => { [key: string]: string };
    export function interpolate<Range, Output>(a: { [key: string]: Range }, b: { [key: string]: Output }): (t: number) => { [key: string]: Output };
    export function interpolate<Range, Output>(a: { [key: string]: Range }, b: { [key: string]: Range }): (t: number) => { [key: string]: Output };

    export function interpolateNumber(a: number, b: number): (t: number) => number;

    export function interpolateRound(a: number, b: number): (t: number) => number;

    export function interpolateString(a: string, b: string): (t: number) => string;

    export function interpolateRgb(a: string | Color, b: string | Color): (t: number) => string;

    export function interpolateHsl(a: string | Color, b: string | Color): (t: number) => string;

    export function interpolateLab(a: string | Color, b: string | Color): (t: number) => string;

    export function interpolateHcl(a: string | Color, b: string | Color): (t: number) => string;

    export function interpolateArray(a: Array<string | Color>, b: Color[]): (t: number) => string[];
    export function interpolateArray<Range, Output>(a: Range[], b: Range[]): (t: number) => Output[];
    export function interpolateArray<Range, Output>(a: Range[], b: Output[]): (t: number) => Output[];

    export function interpolateObject(a: { [key: string]: string | Color }, b: { [key: string]: Color }): (t: number) => { [key: string]: string };
    export function interpolateObject<Range, Output>(a: { [key: string]: Range }, b: { [key: string]: Output }): (t: number) => { [key: string]: Output };
    export function interpolateObject<Range, Output>(a: { [key: string]: Range }, b: { [key: string]: Range }): (t: number) => { [key: string]: Output };

    export function interpolateTransform(a: string | Transform, b: string | Transform): (t: number) => string;

    export function interpolateZoom(a: [number, number, number], b: [number, number, number]): {
        (t: number): [number, number, number];
        duration: number;
    };

    export var interpolators: Array<(a: any, b: any) => (t: number) => any>;

    export module time {
        export var second: Interval;
        export var minute: Interval;
        export var hour: Interval;
        export var day: Interval;
        export var week: Interval;
        export var sunday: Interval;
        export var monday: Interval;
        export var tuesday: Interval;
        export var wednesday: Interval;
        export var thursday: Interval;
        export var friday: Interval;
        export var saturday: Interval;
        export var month: Interval;
        export var year: Interval;

        interface Interval {
            (d: Date): Date;

            floor(d: Date): Date;

            round(d: Date): Date;

            ceil(d: Date): Date;

            range(start: Date, stop: Date, step?: number): Date[];

            offset(date: Date, step: number): Date;

            utc: {
                (d: Date): Date;

                floor(d: Date): Date;

                round(d: Date): Date;

                ceil(d: Date): Date;

                range(start: Date, stop: Date, step?: number): Date[];

                offset(date: Date, step: number): Date;
            }
        }

        export function seconds(start: Date, stop: Date, step?: number): Date[];
        export function minutes(start: Date, stop: Date, step?: number): Date[];
        export function hours(start: Date, stop: Date, step?: number): Date[];
        export function days(start: Date, stop: Date, step?: number): Date[];
        export function weeks(start: Date, stop: Date, step?: number): Date[];
        export function sundays(start: Date, stop: Date, step?: number): Date[];
        export function mondays(start: Date, stop: Date, step?: number): Date[];
        export function tuesdays(start: Date, stop: Date, step?: number): Date[];
        export function wednesdays(start: Date, stop: Date, step?: number): Date[];
        export function thursdays(start: Date, stop: Date, step?: number): Date[];
        export function fridays(start: Date, stop: Date, step?: number): Date[];
        export function saturdays(start: Date, stop: Date, step?: number): Date[];
        export function months(start: Date, stop: Date, step?: number): Date[];
        export function years(start: Date, stop: Date, step?: number): Date[];

        export function dayOfYear(d: Date): number;
        export function weekOfYear(d: Date): number;
        export function sundayOfYear(d: Date): number;
        export function mondayOfYear(d: Date): number;
        export function tuesdayOfYear(d: Date): number;
        export function wednesdayOfYear(d: Date): number;
        export function fridayOfYear(d: Date): number;
        export function saturdayOfYear(d: Date): number;

        export function format(specifier: string): Format;

        export module format {
            export function multi(formats: Array<[string, (d: Date) => boolean|number]>): Format;
            export function utc(specifier: string): Format;
            module utc {
                export function multi(formats: Array<[string, (d: Date) => boolean|number]>): Format;
            }

            export var iso: Format;
        }

        interface Format {
            (d: Date): string;
            parse(input: string): Date;
        }

        export function scale(): Scale<number, number>;
        export function scale<Output>(): Scale<Output, Output>;
        export function scale<Range, Output>(): Scale<Range, Output>;

        export module scale {
            export function utc(): Scale<number, number>;
            export function utc<Output>(): Scale<Output, Output>;
            export function utc<Range, Output>(): Scale<Range, Output>;
        }


        interface Scale<Range, Output> {
            (x: Date): Output;

            invert(y: number): Date;

            domain(): Date[];
            domain(dates: number[]): Scale<Range, Output>;
            domain(dates: Date[]): Scale<Range, Output>;

            nice(): Scale<Range, Output>;
            nice(interval: Interval, step?: number): Scale<Range, Output>;

            range(): Range[];
            range(values: Range[]): Scale<Range, Output>;

            rangeRound(values: number[]): Scale<number, number>;

            interpolate(): (a: Range, b: Range) => (t: number) => Output;
            interpolate(factory: (a: Range, b: Range) => (t: number) => Output): Scale<Range, Output>;

            clamp(): boolean;
            clamp(clamp: boolean): Scale<Range, Output>;

            ticks(): Date[];
            ticks(interval: Interval, step?: number): Date[];
            ticks(count: number): Date[];

            tickFormat(count: number): (d: Date) => string;

            copy(): Scale<Range, Output>;
        }
    }

    export module behavior {
        export function drag<Datum>(): Drag<Datum>;

        interface Drag<Datum> {
            (selection: Selection<Datum>): void;

            on(type: string): (d: Datum, i: number) => any;
            on(type: string, listener: (d: Datum, i: number) => any): Drag<Datum>;

            origin(): (d: Datum, i: number) => { x: number; y: number };
            origin(accessor: (d: Datum, i: number) => { x: number; y: number }): Drag<Datum>;
        }

        export function zoom<Datum>(): Zoom<Datum>;

        module zoom {
            interface Scale {
                domain(): number[];
                domain(values: number[]): Scale;

                invert(y: number): number;

                range(values: number[]): Scale;
                range(): number[];
            }
        }

        interface Zoom<Datum> {
            (selection: Selection<Datum>): void;

            translate(): [number, number];
            translate(translate: [number, number]): Zoom<Datum>;

            scale(): number;
            scale(scale: number): Zoom<Datum>;

            scaleExtent(): [number, number];
            scaleExtent(extent: [number, number]): Zoom<Datum>;

            center(): [number, number];
            center(center: [number, number]): Zoom<Datum>;

            size(): [number, number];
            size(size: [number, number]): Zoom<Datum>;

            x(): zoom.Scale;
            x(x: zoom.Scale): Zoom<Datum>;

            y(): zoom.Scale;
            y(y: zoom.Scale): Zoom<Datum>;

            on(type: string): (d: Datum, i: number) => any;
            on(type: string, listener: (d: Datum, i: number) => any): Zoom<Datum>;

            event(selection: Selection<Datum>): void;
            event(transition: Transition<Datum>): void;
        }
    }

    export module geo {
        export function path(): Path;

        interface Path {
            (feature: any, index?: number): string;

            area(feature: any): number;

            centroid(feature: any): [number, number];

            bounds(feature: any): [[number, number], [number, number]];

            projection(): Transform | ((coordinates: [number, number]) => [number, number]);
            projection(stream: Transform): Path;
            projection(projection: (coordinates: [number, number]) => [number, number]): Path;

            pointRadius(): number | ((datum: any, index: number) => number);
            pointRadius(radius: number): Path;
            pointRadius(radius: (datum: any, index: number) => number): Path;

            context(): CanvasRenderingContext2D;
            context(context: CanvasRenderingContext2D): Path;
        }

        export function graticule(): Graticule;

        interface Graticule {
            (): any;

            lines(): any[];

            outline(): any;

            extent(): [[number, number], [number, number]];
            extent(extent: [[number, number], [number, number]]): Graticule;

            majorExtent(): [[number, number], [number, number]];
            majorExtent(extent: [[number, number], [number, number]]): Graticule;

            minorExtent(): [[number, number], [number, number]];
            minorExtent(extent: [[number, number], [number, number]]): Graticule;

            step(): [number, number];
            step(step: [number, number]): Graticule;

            majorStep(): [number, number];
            majorStep(step: [number, number]): Graticule;

            minorStep(): [number, number];
            minorStep(step: [number, number]): Graticule;

            precision(): number;
            precision(precision: number): Graticule;
        }

        export function circle(): Circle;

        interface Circle {
            (...args: any[]): any;

            origin(): [number, number] | ((...args: any[]) => [number, number]);
            origin(origin: [number, number]): Circle;
            origin(origin: (...args: any[]) => [number, number]): Circle;

            angle(): number;
            angle(angle: number): Circle;

            precision(): number;
            precision(precision: number): Circle;
        }

        export function area(feature: any): number;
        export function centroid(feature: any): [number, number];
        export function bounds(feature: any): [[number, number], [number, number]];
        export function distance(a: [number, number], b: [number, number]): number;
        export function length(feature: any): number;
        export function interpolate(a: [number, number], b: [number, number]): (t: number) => [number, number];

        export function rotation(rotate: [number, number] | [number, number, number]): Rotation;

        interface Rotation {
            (location: [number, number]): [number, number];
            invert(location: [number, number]): [number, number];
        }

        export function stream(object: any, listener: Listener): void;

        interface Listener {
            point(x: number, y: number, z: number): void;
            lineStart(): void;
            lineEnd(): void;
            polygonStart(): void;
            polygonEnd(): void;
            sphere(): void;
        }

        export function transform(methods: TransformMethods): Transform;

        interface TransformMethods {
            point?(x: number, y: number, z: number): void;
            lineStart?(): void;
            lineEnd?(): void;
            polygonStart?(): void;
            polygonEnd?(): void;
            sphere?(): void;
        }

        interface Transform {
            stream(stream: Listener): Listener;
        }

        export function clipExtent(): ClipExtent;

        interface ClipExtent extends Transform {
            extent(): [[number, number], [number, number]];
            extent(extent: [[number, number], [number, number]]): ClipExtent;
        }

        export function projection(raw: RawInvertibleProjection): InvertibleProjection;
        export function projection(raw: RawProjection): Projection;

        export function projectionMutator(factory: (...args: any[]) => RawInvertibleProjection): (...args: any[]) => InvertibleProjection;
        export function projectionMutator(factory: (...args: any[]) => RawProjection): (...args: any[]) => Projection;

        export function albers(): ConicProjection;
        export function albersUsa(): ConicProjection;
        export function azimuthalEqualArea(): InvertibleProjection;
        module azimuthalEqualArea {
            export function raw(lambda: number, phi: number): [number, number];
            module raw {
                export function invert(x: number, y: number): [number, number];
            }
        }

        export function azimuthalEquidistant(): InvertibleProjection;
        module azimuthalEquidistant {
            export function raw(lambda: number, phi: number): [number, number];
            module raw {
                export function invert(x: number, y: number): [number, number];
            }
        }

        export function conicConformal(): ConicProjection;
        module conicConformal {
            export function raw(phi0: number, phi1: number): RawInvertibleProjection;
        }

        export function conicEqualArea(): ConicProjection;
        module conicEqualArea {
            export function raw(phi0: number, phi1: number): RawInvertibleProjection;
        }

        export function conicEquidistant(): ConicProjection;
        module conicEquidistant {
            export function raw(phi0: number, phi1: number): RawInvertibleProjection;
        }

        export function equirectangular(): InvertibleProjection;
        module equirectangular {
            export function raw(lambda: number, phi: number): [number, number];
            module raw {
                export function invert(x: number, y: number): [number, number];
            }
        }

        export function gnomonic(): InvertibleProjection;
        module gnomonic {
            export function raw(lambda: number, phi: number): [number, number];
            module raw {
                export function invert(x: number, y: number): [number, number];
            }
        }

        export function mercator(): InvertibleProjection;
        module mercator {
            export function raw(lambda: number, phi: number): [number, number];
            module raw {
                export function invert(x: number, y: number): [number, number];
            }
        }

        export function orthographic(): InvertibleProjection;
        module orthographic {
            export function raw(lambda: number, phi: number): [number, number];
            module raw {
                export function invert(x: number, y: number): [number, number];
            }
        }

        export function stereographic(): InvertibleProjection;
        module stereographic {
            export function raw(lambda: number, phi: number): [number, number];
            module raw {
                export function invert(x: number, y: number): [number, number];
            }
        }

        export function transverseMercator(): InvertibleProjection;
        module transverseMercator {
            export function raw(lambda: number, phi: number): [number, number];
            module raw {
                export function invert(x: number, y: number): [number, number];
            }
        }

        interface Projection {
            (location: [number, number]): [number, number];

            rotate(): [number, number, number];
            rotate(rotation: [number, number, number]): Projection;

            center(): [number, number];
            center(location: [number, number]): Projection;

            translate(): [number, number];
            translate(point: [number, number]): Projection;

            scale(): number;
            scale(scale: number): Projection;

            clipAngle(): number;
            clipAngle(angle: number): Projection;

            clipExtent(): [[number, number], [number, number]];
            clipExtent(extent: [[number, number], [number, number]]): Projection;

            precision(): number;
            precision(precision: number): Projection;

            stream(listener: Listener): Listener;
        }

        interface InvertibleProjection extends Projection {
            invert(point: [number, number]): [number, number];
        }

        interface ConicProjection extends InvertibleProjection {
            parallels(): [number, number];
            parallels(parallels: [number, number]): ConicProjection;

            rotate(): [number, number, number];
            rotate(rotation: [number, number, number]): ConicProjection;

            center(): [number, number];
            center(location: [number, number]): ConicProjection;

            translate(): [number, number];
            translate(point: [number, number]): ConicProjection;

            scale(): number;
            scale(scale: number): ConicProjection;

            clipAngle(): number;
            clipAngle(angle: number): ConicProjection;

            clipExtent(): [[number, number], [number, number]];
            clipExtent(extent: [[number, number], [number, number]]): ConicProjection;

            precision(): number;
            precision(precision: number): ConicProjection;
        }

        interface RawProjection {
            (lambda: number, phi: number): [number, number];
        }

        interface RawInvertibleProjection extends RawProjection {
            invert(x: number, y: number): [number, number];
        }
    }

    module svg {
        export function line(): Line<[number, number]>;
        export function line<T>(): Line<T>;

        interface Line<T> {
            (data: T[]): string;

            x(): number | ((d: T, i: number) => number);
            x(x: number): Line<T>;
            x(x: (d: T, i: number) => number): Line<T>;

            y(): number | ((d: T, i: number) => number);
            y(x: number): Line<T>;
            y(y: (d: T, i: number) => number): Line<T>;

            interpolate(): string | ((points: Array<[number, number]>) => string);
            interpolate(interpolate: "linear"): Line<T>;
            interpolate(interpolate: "linear-closed"): Line<T>;
            interpolate(interpolate: "step"): Line<T>;
            interpolate(interpolate: "step-before"): Line<T>;
            interpolate(interpolate: "step-after"): Line<T>;
            interpolate(interpolate: "basis"): Line<T>;
            interpolate(interpolate: "basis-open"): Line<T>;
            interpolate(interpolate: "basis-closed"): Line<T>;
            interpolate(interpolate: "bundle"): Line<T>;
            interpolate(interpolate: "cardinal"): Line<T>;
            interpolate(interpolate: "cardinal-open"): Line<T>;
            interpolate(interpolate: "cardinal-closed"): Line<T>;
            interpolate(interpolate: "monotone"): Line<T>;
            interpolate(interpolate: string | ((points: Array<[number, number]>) => string)): Line<T>;

            tension(): number;
            tension(tension: number): Line<T>;

            defined(): (d: T, i: number) => boolean;
            defined(defined: (d: T, i: number) => boolean): Line<T>;
        }

        module line {
            export function radial(): Radial<[number, number]>;
            export function radial<T>(): Radial<T>;

            interface Radial<T> {
                (data: T[]): string;

                radius(): number | ((d: T, i: number) => number);
                radius(radius: number): Radial<T>;
                radius(radius: (d: T, i: number) => number): Radial<T>;

                angle(): number | ((d: T, i: number) => number);
                angle(angle: number): Radial<T>;
                angle(angle: (d: T, i: number) => number): Radial<T>;

                interpolate(): string | ((points: Array<[number, number]>) => string);
                interpolate(interpolate: "linear"): Radial<T>;
                interpolate(interpolate: "linear-closed"): Radial<T>;
                interpolate(interpolate: "step"): Radial<T>;
                interpolate(interpolate: "step-before"): Radial<T>;
                interpolate(interpolate: "step-after"): Radial<T>;
                interpolate(interpolate: "basis"): Radial<T>;
                interpolate(interpolate: "basis-open"): Radial<T>;
                interpolate(interpolate: "basis-closed"): Radial<T>;
                interpolate(interpolate: "bundle"): Radial<T>;
                interpolate(interpolate: "cardinal"): Radial<T>;
                interpolate(interpolate: "cardinal-open"): Radial<T>;
                interpolate(interpolate: "cardinal-closed"): Radial<T>;
                interpolate(interpolate: "monotone"): Radial<T>;
                interpolate(interpolate: string | ((points: Array<[number, number]>) => string)): Radial<T>;

                tension(): number;
                tension(tension: number): Radial<T>;

                defined(): (d: T, i: number) => boolean;
                defined(defined: (d: T, i: number) => boolean): Radial<T>;
            }
        }

        export function area(): Area<[number, number]>;
        export function area<T>(): Area<T>;

        interface Area<T> {
            (data: T[]): string;

            x(): number | ((d: T, i: number) => number);
            x(x: number): Area<T>;
            x(x: (d: T, i: number) => number): Area<T>;

            x0(): number | ((d: T, i: number) => number);
            x0(x0: number): Area<T>;
            x0(x0: (d: T, i: number) => number): Area<T>;

            x1(): number | ((d: T, i: number) => number);
            x1(x1: number): Area<T>;
            x1(x1: (d: T, i: number) => number): Area<T>;

            y(): number | ((d: T, i: number) => number);
            y(y: number): Area<T>;
            y(y: (d: T, i: number) => number): Area<T>;

            y0(): number | ((d: T, i: number) => number);
            y0(y0: number): Area<T>;
            y0(y0: (d: T, i: number) => number): Area<T>;

            y1(): number | ((d: T, i: number) => number);
            y1(y1: number): Area<T>;
            y1(y1: (d: T, i: number) => number): Area<T>;

            interpolate(): string | ((points: Array<[number, number]>) => string);
            interpolate(interpolate: "linear"): Area<T>;
            interpolate(interpolate: "step"): Area<T>;
            interpolate(interpolate: "step-before"): Area<T>;
            interpolate(interpolate: "step-after"): Area<T>;
            interpolate(interpolate: "basis"): Area<T>;
            interpolate(interpolate: "basis-open"): Area<T>;
            interpolate(interpolate: "cardinal"): Area<T>;
            interpolate(interpolate: "cardinal-open"): Area<T>;
            interpolate(interpolate: "monotone"): Area<T>;
            interpolate(interpolate: string | ((points: Array<[number, number]>) => string)): Area<T>;

            tension(): number;
            tension(tension: number): Area<T>;

            defined(): (d: T, i: number) => boolean;
            defined(defined: (d: T, i: number) => boolean): Area<T>;
        }

        module area {
            export function radial(): Radial<[number, number]>;
            export function radial<T>(): Radial<T>;

            interface Radial<T> {
                (data: T[]): string;

                radius(): number | ((d: T, i: number) => number);
                radius(radius: number): Radial<T>;
                radius(radius: (d: T, i: number) => number): Radial<T>;

                innerRadius(): number | ((d: T, i: number) => number);
                innerRadius(innerRadius: number): Radial<T>;
                innerRadius(innerRadius: (d: T, i: number) => number): Radial<T>;

                outerRadius(): number | ((d: T, i: number) => number);
                outerRadius(outerRadius: number): Radial<T>;
                outerRadius(outerRadius: (d: T, i: number) => number): Radial<T>;

                angle(): number | ((d: T, i: number) => number);
                angle(angle: number): Radial<T>;
                angle(angle: (d: T, i: number) => number): Radial<T>;

                startAngle(): number | ((d: T, i: number) => number);
                startAngle(startAngle: number): Radial<T>;
                startAngle(startAngle: (d: T, i: number) => number): Radial<T>;

                endAngle(): number | ((d: T, i: number) => number);
                endAngle(endAngle: number): Radial<T>;
                endAngle(endAngle: (d: T, i: number) => number): Radial<T>;

                interpolate(): string | ((points: Array<[number, number]>) => string);
                interpolate(interpolate: "linear"): Radial<T>;
                interpolate(interpolate: "step"): Radial<T>;
                interpolate(interpolate: "step-before"): Radial<T>;
                interpolate(interpolate: "step-after"): Radial<T>;
                interpolate(interpolate: "basis"): Radial<T>;
                interpolate(interpolate: "basis-open"): Radial<T>;
                interpolate(interpolate: "cardinal"): Radial<T>;
                interpolate(interpolate: "cardinal-open"): Radial<T>;
                interpolate(interpolate: "monotone"): Radial<T>;
                interpolate(interpolate: string | ((points: Array<[number, number]>) => string)): Radial<T>;

                tension(): number;
                tension(tension: number): Radial<T>;

                defined(): (d: T, i: number) => boolean;
                defined(defined: (d: T, i: number) => boolean): Radial<T>;
            }
        }

        export function arc(): Arc<arc.Arc>;
        export function arc<T>(): Arc<T>;

        module arc {
            interface Arc {
                innerRadius: number;
                outerRadius: number;
                startAngle: number;
                endAngle: number;
                padAngle: number
            }
        }

        interface Arc<T> {
            (d: T, i?: number): string;

            innerRadius(): (d: T, i: number) => number;
            innerRadius(radius: number): Arc<T>;
            innerRadius(radius: (d: T, i: number) => number): Arc<T>;

            outerRadius(): (d: T, i: number) => number;
            outerRadius(radius: number): Arc<T>;
            outerRadius(radius: (d: T, i: number) => number): Arc<T>;

            cornerRadius(): (d: T, i: number) => number;
            cornerRadius(radius: number): Arc<T>;
            cornerRadius(radius: (d: T, i: number) => number): Arc<T>;

            padRadius(): string | ((d: T, i: number) => number);
            padRadius(radius: "auto"): Arc<T>;
            padRadius(radius: string): Arc<T>;
            padRadius(radius: (d: T, i: number) => number): Arc<T>;

            startAngle(): (d: T, i: number) => number;
            startAngle(angle: number): Arc<T>;
            startAngle(angle: (d: T, i: number) => number): Arc<T>;

            endAngle(): (d: T, i: number) => number;
            endAngle(angle: number): Arc<T>;
            endAngle(angle: (d: T, i: number) => number): Arc<T>;

            padAngle(): (d: T, i: number) => number;
            padAngle(angle: number): Arc<T>;
            padAngle(angle: (d: T, i: number) => number): Arc<T>;

            centroid(d: T, i?: number): [number, number];
        }

        export function symbol(): Symbol<{}>;
        export function symbol<T>(): Symbol<T>;

        interface Symbol<T> {
            (d: T, i?: number): string;

            type(): (d: T, i: number) => string;
            type(type: string): Symbol<T>;
            type(type: (d: T, i: number) => string): Symbol<T>;

            size(): (d: T, i: string) => number;
            size(size: number): Symbol<T>;
            size(size: (d: T, i: number) => number): Symbol<T>;
        }

        export var symbolTypes: string[];

        export function chord(): Chord<chord.Link<chord.Node>, chord.Node>;
        export function chord<Node>(): Chord<chord.Link<Node>, Node>;
        export function chord<Link, Node>(): Chord<Link, Node>;

        module chord {
            interface Link<Node> {
                source: Node;
                target: Node;
            }

            interface Node {
                radius: number;
                startAngle: number;
                endAngle: number
            }
        }

        interface Chord<Link, Node> {
            (d: Link, i: number): string;

            source(): (d: Link, i: number) => Node;
            source(source: Node): Chord<Link, Node>;
            source(source: (d: Link, i: number) => Node): Chord<Link, Node>;

            target(): (d: Link, i: number) => Node;
            target(target: Node): Chord<Link, Node>;
            target(target: (d: Link, i: number) => Node): Chord<Link, Node>;

            radius(): (d: Node, i: number) => number;
            radius(radius: number): Chord<Link, Node>;
            radius(radius: (d: Node, i: number) => number): Chord<Link, Node>;

            startAngle(): (d: Node, i: number) => number;
            startAngle(angle: number): Chord<Link, Node>;
            startAngle(angle: (d: Node, i: number) => number): Chord<Link, Node>;

            endAngle(): (d: Node, i: number) => number;
            endAngle(angle: number): Chord<Link, Node>;
            endAngle(angle: (d: Node, i: number) => number): Chord<Link, Node>;
        }

        export function diagonal(): Diagonal<diagonal.Link<diagonal.Node>, diagonal.Node>;
        export function diagonal<Node>(): Diagonal<diagonal.Link<Node>, Node>;
        export function diagonal<Link, Node>(): Diagonal<Link, Node>;

        module diagonal {
            interface Link<Node> {
                source: Node;
                target: Node;
            }

            interface Node {
                x: number;
                y: number;
            }
        }

        interface Diagonal<Link, Node> {
            (d: Link, i: number): string;

            source(): (d: Link, i: number) => Node;
            source(source: Node): Diagonal<Link, Node>;
            source(source: (d: Link, i: number) => Node): Diagonal<Link, Node>;

            target(): (d: Link, i: number) => Node;
            target(target: Node): Diagonal<Link, Node>;
            target(target: (d: Link, i: number) => Node): Diagonal<Link, Node>;

            projection(): (d: Node, i: number) => [number, number];
            projection(projection: (d: Node, i: number) => [number, number]): Diagonal<Link, Node>;
        }

        module diagonal {
            export function radial(): Radial<Link<Node>, Node>;
            export function radial<Node>(): Radial<Link<Node>, Node>;
            export function radial<Link, Node>(): Radial<Link, Node>;

            interface Radial<Link, Node> {
                (d: Link, i: number): string;

                source(): (d: Link, i: number) => Node;
                source(source: Node): Radial<Link, Node>;
                source(source: (d: Link, i: number) => Node): Radial<Link, Node>;

                target(): (d: Link, i: number) => Node;
                target(target: Node): Radial<Link, Node>;
                target(target: (d: Link, i: number) => Node): Radial<Link, Node>;

                projection(): (d: Node, i: number) => [number, number];
                projection(projection: (d: Node, i: number) => [number, number]): Radial<Link, Node>;
            }
        }

        export function axis(): Axis;

        interface Axis {
            (selection: Selection<any>): void;
            (selection: Transition<any>): void;

            scale(): any;
            scale(scale: any): Axis;

            orient(): string;
            orient(orientation: string): Axis;

            ticks(): any[];
            ticks(...args: any[]): Axis;

            tickValues(): any[];
            tickValues(values: any[]): Axis;

            tickSize(): number;
            tickSize(size: number): Axis;
            tickSize(inner: number, outer: number): Axis;

            innerTickSize(): number;
            innerTickSize(size: number): Axis;

            outerTickSize(): number;
            outerTickSize(size: number): Axis;

            tickPadding(): number;
            tickPadding(padding: number): Axis;

            tickFormat(): (t: any) => string;
            tickFormat(format: (t: any) => string): Axis;
            tickFormat(format:string): Axis;
        }

        export function brush(): Brush<any>;
        export function brush<T>(): Brush<T>;

        module brush {
            interface Scale {
                domain(): number[];
                domain(domain: number[]): Scale;

                range(): number[];
                range(range: number[]): Scale;

                invert?(y: number): number;
            }
        }

        interface Brush<T> {
            (selection: Selection<T>): void;
            (selection: Transition<T>): void;

            event(selection: Selection<T>): void;
            event(selection: Transition<T>): void;

            x(): brush.Scale;
            x(x: brush.Scale): Brush<T>;

            y(): brush.Scale;
            y(y: brush.Scale): Brush<T>;

            extent(): [number, number] | [[number, number], [number, number]];
            extent(extent: [number, number] | [[number, number], [number, number]]): Brush<T>;

            clamp(): boolean | [boolean, boolean];
            clamp(clamp: boolean | [boolean, boolean]): Brush<T>;

            clear(): void;

            empty(): boolean;

            on(type: 'brushstart'): (datum: T, index: number) => void;
            on(type: 'brush'): (datum: T, index: number) => void;
            on(type: 'brushend'): (datum: T, index: number) => void;
            on(type: string): (datum: T, index: number) => void;

            on(type: 'brushstart', listener: (datum: T, index: number) => void): Brush<T>;
            on(type: 'brush', listener: (datum: T, index: number) => void): Brush<T>;
            on(type: 'brushend', listener: (datum: T, index: number) => void): Brush<T>;
            on(type: string, listener: (datum: T, index: number) => void): Brush<T>;
        }
    }

    export function xhr(url: string, mimeType?: string, callback?: (err: any, data: any) => void): Xhr;
    export function xhr(url: string, callback: (err: any, data: any) => void): Xhr;

    interface Xhr {
        header(name: string): string;
        header(name: string, value: string): Xhr;

        mimeType(): string;
        mimeType(type: string): Xhr;

        responseType(): string;
        responseType(type: string): Xhr;

        response(): (request: XMLHttpRequest) => any;
        response(value: (request: XMLHttpRequest) => any): Xhr;

        get(callback?: (err: any, data: any) => void): Xhr;

        post(data?: any, callback?: (err: any, data: any) => void): Xhr;
        post(callback: (err: any, data: any) => void): Xhr;

        send(method: string, data?: any, callback?: (err: any, data: any) => void): Xhr;
        send(method: string, callback: (err: any, data: any) => void): Xhr;

        abort(): Xhr;

        on(type: "beforesend"): (request: XMLHttpRequest) => void;
        on(type: "progress"): (request: XMLHttpRequest) => void;
        on(type: "load"): (response: any) => void;
        on(type: "error"): (err: any) => void;
        on(type: string): (...args: any[]) => void;

        on(type: "beforesend", listener: (request: XMLHttpRequest) => void): Xhr;
        on(type: "progress", listener: (request: XMLHttpRequest) => void): Xhr;
        on(type: "load", listener: (response: any) => void): Xhr;
        on(type: "error", listener: (err: any) => void): Xhr;
        on(type: string, listener: (...args: any[]) => void): Xhr;
    }

    export function text(url: string, mimeType?: string, callback?: (err: any, data: string) => void): Xhr;
    export function text(url: string, callback: (err: any, data: string) => void): Xhr;

    export function json(url: string, callback?: (err: any, data: any) => void): Xhr;

    export function xml(url: string, mimeType?: string, callback?: (err: any, data: any) => void): Xhr;
    export function xml(url: string, callback: (err: any, data: any) => void): Xhr;

    export function html(url: string, callback?: (err: any, data: DocumentFragment) => void): Xhr;

    export var csv: Dsv;
    export var tsv: Dsv;
    export function dsv(delimiter: string, mimeType: string): Dsv;

    interface Dsv {
        (url: string, callback: (rows: { [key: string]: string }[]) => void): DsvXhr<{ [key: string]: string }>;
        (url: string, callback: (error: any, rows: { [key: string]: string }[]) => void): DsvXhr<{ [key: string]: string }>;
        (url: string): DsvXhr<{ [key: string]: string }>;
        <T>(url: string, accessor: (row: { [key: string]: string }) => T, callback: (rows: T[]) => void): DsvXhr<T>;
        <T>(url: string, accessor: (row: { [key: string]: string }) => T, callback: (error: any, rows: T[]) => void): DsvXhr<T>;
        <T>(url: string, accessor: (row: { [key: string]: string }) => T): DsvXhr<T>;

        parse(string: string): { [key: string]: string }[];
        parse<T>(string: string, accessor: (row: { [key: string]: string }, index: number) => T): T[];

        parseRows(string: string): string[][];
        parseRows<T>(string: string, accessor: (row: string[], index: number) => T): T[];

        format(rows: Object[]): string;

        formatRows(rows: string[][]): string;
    }

    interface DsvXhr<T> extends Xhr {
        row(): (row: { [key: string]: string }) => T;
        row<U>(accessor: (row: { [key: string]: string }) => U): DsvXhr<U>;

        header(name: string): string;
        header(name: string, value: string): DsvXhr<T>;

        mimeType(): string;
        mimeType(type: string): DsvXhr<T>;

        responseType(): string;
        responseType(type: string): DsvXhr<T>;

        response(): (request: XMLHttpRequest) => any;
        response(value: (request: XMLHttpRequest) => any): DsvXhr<T>;

        get(callback?: (err: any, data: T) => void): DsvXhr<T>;
        post(data?: any, callback?: (err: any, data: T) => void): DsvXhr<T>;
        post(callback: (err: any, data: T) => void): DsvXhr<T>;

        send(method: string, data?: any, callback?: (err: any, data: T) => void): DsvXhr<T>;
        send(method: string, callback: (err: any, data: T) => void): DsvXhr<T>;

        abort(): DsvXhr<T>;

        on(type: "beforesend"): (request: XMLHttpRequest) => void;
        on(type: "progress"): (request: XMLHttpRequest) => void;
        on(type: "load"): (response: T) => void;
        on(type: "error"): (err: any) => void;
        on(type: string): (...args: any[]) => void;

        on(type: "beforesend", listener: (request: XMLHttpRequest) => void): DsvXhr<T>;
        on(type: "progress", listener: (request: XMLHttpRequest) => void): DsvXhr<T>;
        on(type: "load", listener: (response: T) => void): DsvXhr<T>;
        on(type: "error", listener: (err: any) => void): DsvXhr<T>;
        on(type: string, listener: (...args: any[]) => void): DsvXhr<T>;
    }

    export function locale(definition: LocaleDefinition): Locale;

    interface LocaleDefinition {
        decimal: string;
        thousands: string;
        grouping: number[];
        currency: [string, string];
        dateTime: string;
        date: string;
        time: string;
        periods: [string, string];
        days: [string, string, string, string, string, string, string];
        shortDays: [string, string, string, string, string, string, string];
        months: [string, string, string, string, string, string, string, string, string, string, string, string];
        shortMonths: [string, string, string, string, string, string, string, string, string, string, string, string];
    }

    interface Locale {
        numberFormat(specifier: string): (n: number) => string;
        timeFormat: {
            (specifier: string): time.Format;
            utc(specifier: string): time.Format;
            multi(formats: Array<[string, (d: Date) => boolean|number]>): time.Format;
        }
    }

    module layout {
        export function bundle(): Bundle<bundle.Node>;
        export function bundle<T extends bundle.Node>(): Bundle<T>

        module bundle {
            interface Node {
                parent: Node;
            }

            interface Link<T extends Node> {
                source: T;
                target: T;
            }
        }

        interface Bundle<T extends bundle.Node> {
            (links: bundle.Link<T>[]): T[][];
        }

        export function chord(): Chord;

        module chord {
            interface Link {
                source: Node;
                target: Node;
            }

            interface Node {
                index: number;
                subindex: number;
                startAngle: number;
                endAngle: number;
                value: number;
            }

            interface Group {
                index: number;
                startAngle: number;
                endAngle: number;
                value: number;
            }
        }

        interface Chord {
            matrix(): number[][];
            matrix(matrix: number[][]): Chord;

            padding(): number;
            padding(padding: number): Chord;

            sortGroups(): (a: number, b: number) => number;
            sortGroups(comparator: (a: number, b: number) => number): Chord;

            sortSubgroups(): (a: number, b: number) => number;
            sortSubgroups(comparator: (a: number, b: number) => number): Chord;

            sortChords(): (a: number, b: number) => number;
            sortChords(comparator: (a: number, b: number) => number): Chord;

            chords(): chord.Link[];
            groups(): chord.Group[];
        }

        export function cluster(): Cluster<cluster.Result>;
        export function cluster<T extends cluster.Result>(): Cluster<T>;

        module cluster {
            interface Result {
                parent?: Result;
                children?: Result[];
                depth?: number;
                x?: number;
                y?: number;
            }

            interface Link<T extends Result> {
                source: T;
                target: T;
            }
        }

        interface Cluster<T extends cluster.Result> {
            (root: T): T[];

            nodes(root: T): T[];

            links(nodes: T[]): cluster.Link<T>[];

            children(): (node: T) => T[];
            children(accessor: (node: T) => T[]): Cluster<T>;

            sort(): (a: T, b: T) => number;
            sort(comparator: (a: T, b: T) => number): Cluster<T>;

            separation(): (a: T, b: T) => number;
            separation(separation: (a: T, b: T) => number): Cluster<T>;

            size(): [number, number];
            size(size: [number, number]): Cluster<T>;

            nodeSize(): [number, number];
            nodeSize(nodeSize: [number, number]): Cluster<T>;

            value(): (a: T) => number;
            value(value: (a: T) => number): Cluster<T>;
        }

        export function force(): Force<force.Link<force.Node>, force.Node>;
        export function force<Node extends force.Node>(): Force<force.Link<Node>, Node>;
        export function force<Link extends force.Link<force.Node>, Node extends force.Node>(): Force<Link, Node>;

        module force {
            interface Link<T extends Node> {
                source: T;
                target: T;
            }

            interface Node {
                index?: number;
                x?: number;
                y?: number;
                px?: number;
                py?: number;
                fixed?: boolean;
                weight?: number;
            }

            interface Event {
                type: string;
                alpha: number;
            }
        }

        interface Force<Link extends force.Link<force.Node>, Node extends force.Node> {
            size(): [number, number];
            size(size: [number, number]): Force<Link, Node>;

            linkDistance(): number | ((link: Link, index: number) => number);
            linkDistance(distance: number): Force<Link, Node>;
            linkDistance(distance: (link: Link, index: number) => number): Force<Link, Node>;

            linkStrength(): number | ((link: Link, index: number) => number);
            linkStrength(strength: number): Force<Link, Node>;
            linkStrength(strength: (link: Link, index: number) => number): Force<Link, Node>;

            friction(): number;
            friction(friction: number): Force<Link, Node>;

            charge(): number | ((node: Node, index: number) => number);
            charge(charge: number): Force<Link, Node>;
            charge(charge: (node: Node, index: number) => number): Force<Link, Node>;

            chargeDistance(): number;
            chargeDistance(distance: number): Force<Link, Node>;

            theta(): number;
            theta(theta: number): Force<Link, Node>;

            gravity(): number;
            gravity(gravity: number): Force<Link, Node>;

            nodes(): Node[];
            nodes(nodes: Node[]): Force<Link, Node>;

            links(): Link[];
            links(links: { source: number; target: number }[]): Force<Link, Node>;
            links(links: Link[]): Force<Link, Node>;

            start(): Force<Link, Node>;

            alpha(): number;
            alpha(value: number): Force<Link, Node>;

            resume(): Force<Link, Node>;

            stop(): Force<Link, Node>;

            on(type: string): (event: force.Event) => void;
            on(type: string, listener: (event: force.Event) => void): Force<Link, Node>;

            drag(): behavior.Drag<Node>;
            drag(selection: Selection<Node>): void;
        }

        export function hierarchy(): Hierarchy<hierarchy.Result>;
        export function hierarchy<T extends hierarchy.Result>(): Hierarchy<T>;

        module hierarchy {
            interface Result {
                parent?: Result;
                children?: Result[];
                value?: number;
                depth?: number;
            }
        }

        interface Hierarchy<T extends hierarchy.Result> {
            (root: T): T[];

            children(): (node: T) => T[];
            children(accessor: (node: T) => T[]): Hierarchy<T>;

            sort(): (a: T, b: T) => number;
            sort(comparator: (a: T, b: T) => number): Hierarchy<T>;

            value(): (node: T) => number;
            value(accessor: (node: T) => number): Hierarchy<T>;

            revalue(root: T): T[];
        }

        export function histogram(): Histogram<number>;
        export function histogram<T>(): Histogram<T>;

        module histogram {
            interface Bin<T> extends Array<T> {
                x: number;
                dx: number;
                y: number;
            }
        }

        interface Histogram<T> {
            (values: T[], index?: number): histogram.Bin<T>[];

            value(): (datum: T, index: number) => number;
            value(value: (datum: T, index: number) => number): Histogram<T>;

            range(): (values: T[], index: number) => [number, number];
            range(range: (values: T[], index: number) => [number, number]): Histogram<T>;

            bins(): (range: [number, number], values: T[], index: number) => number[];
            bins(count: number): Histogram<T>;
            bins(thresholds: number[]): Histogram<T>;
            bins(func: (range: [number, number], values: T[], index: number) => number[]): Histogram<T>;

            frequency(): boolean;
            frequency(frequency: boolean): Histogram<T>;
        }

        export function pack(): Pack<pack.Node>;
        export function pack<T extends pack.Node>(): Pack<T>;

        module pack {
            interface Node {
                parent?: Node;
                children?: Node[];
                value?: number;
                depth?: number;
                x?: number;
                y?: number;
                r?: number;
            }

            interface Link<T extends Node> {
                source: Node;
                target: Node;
            }
        }

        interface Pack<T extends pack.Node> {
            (root: T): T[];

            nodes(root: T): T[];

            links(nodes: T[]): pack.Link<T>[];

            children(): (node: T, depth: number) => T[];
            children(children: (node: T, depth: number) => T[]): Pack<T>;

            sort(): (a: T, b: T) => number;
            sort(comparator: (a: T, b: T) => number): Pack<T>;

            value(): (node: T) => number;
            value(value: (node: T) => number): Pack<T>;

            size(): [number, number];
            size(size: [number, number]): Pack<T>;

            radius(): number | ((node: T) => number);
            radius(radius: number): Pack<T>;
            radius(radius: (node: T) => number): Pack<T>;

            padding(): number;
            padding(padding: number): Pack<T>;
        }

        export function pie(): Pie<number>;
        export function pie<T>(): Pie<T>;

        module pie {
            interface Arc<T> {
                value: number;
                startAngle: number;
                endAngle: number;
                padAngle: number;
                data: T;
            }
        }

        interface Pie<T> {
            (data: T[], index?: number): pie.Arc<T>[];

            value(): (datum: T, index: number) => number;
            value(accessor: (datum: T, index: number) => number): Pie<T>;

            sort(): (a: T, b: T) => number;
            sort(comparator: (a: T, b: T) => number): Pie<T>;

            startAngle(): number | ((data: T[], index: number) => number);
            startAngle(angle: number): Pie<T>;
            startAngle(angle: (data: T[], index: number) => number): Pie<T>;

            endAngle(): number | ((data: T[], index: number) => number);
            endAngle(angle: number): Pie<T>;
            endAngle(angle: (data: T[], index: number) => number): Pie<T>;

            padAngle(): number | ((data: T[], index: number) => number);
            padAngle(angle: number): Pie<T>;
            padAngle(angle: (data: T[], index: number) => number): Pie<T>;
        }

        export function stack(): Stack<stack.Value[], stack.Value>;
        export function stack<Value>(): Stack<Value[], Value>;
        export function stack<Series, Value>(): Stack<Series, Value>;
        module stack {
            interface Value {
                x: number;
                y: number;
                y0?: number;
            }
        }

        interface Stack<Series, Value> {
            (layers: Series[], index?: number): Series[];

            values(): (layer: Series, index: number) => Value[];
            values(accessor: (layer: Series, index: number) => Value[]): Stack<Series, Value>;

            offset(): (data: Array<[number, number]>) => number[];
            offset(offset: "silhouette"): Stack<Series, Value>;
            offset(offset: "wiggle"): Stack<Series, Value>;
            offset(offset: "expand"): Stack<Series, Value>;
            offset(offset: "zero"): Stack<Series, Value>;
            offset(offset: string): Stack<Series, Value>;
            offset(offset: (data: Array<[number, number]>) => number[]): Stack<Series, Value>;

            order(): (data: Array<[number, number]>) => number[];
            order(order: "inside-out"): Stack<Series, Value>;
            order(order: "reverse"): Stack<Series, Value>;
            order(order: "default"): Stack<Series, Value>;
            order(order: string): Stack<Series, Value>;
            order(order: (data: Array<[number, number]>) => number[]): Stack<Series, Value>;

            x(): (value: Value, index: number) => number;
            x(accessor: (value: Value, index: number) => number): Stack<Series, Value>;

            y(): (value: Value, index: number) => number;
            y(accesor: (value: Value, index: number) => number): Stack<Series, Value>;

            out(): (value: Value, y0: number, y: number) => void;
            out(setter: (value: Value, y0: number, y: number) => void): Stack<Series, Value>;
        }

        export function tree(): Tree<tree.Node>;
        export function tree<T extends tree.Node>(): Tree<T>;

        module tree {
            interface Link<T extends Node> {
                source: T;
                target: T;
            }

            interface Node {
                parent?: Node;
                children?: Node[];
                depth?: number;
                x?: number;
                y?: number;
            }
        }

        interface Tree<T> {
            (root: T, index?: number): T[];

            nodes(root: T, index?: number): T[];

            links(nodes: T[]): tree.Link<T>[];

            children(): (datum: T, index: number) => T[];
            children(children: (datum: T, index: number) => T[]): Tree<T>;

            separation(): (a: T, b: T) => number;
            separation(separation: (a: T, b: T) => number): Tree<T>;

            size(): [number, number];
            size(size: [number, number]): Tree<T>;

            nodeSize(): [number, number];
            nodeSize(size: [number, number]): Tree<T>;

            sort(): (a: T, b: T) => number;
            sort(comparator: (a: T, b: T) => number): Tree<T>;

            value(): (datum: T, index: number) => number;
            value(value: (datum: T, index: number) => number): Tree<T>;
        }

        export function treemap(): Treemap<treemap.Node>;
        export function treemap<T extends treemap.Node>(): Treemap<T>;

        module treemap {
            interface Node {
                parent?: Node;
                children?: Node[];
                value?: number;
                depth?: number;
                x?: number;
                y?: number;
                dx?: number;
                dy?: number;
            }

            interface Link<T extends Node> {
                source: T;
                target: T;
            }

            type Padding = number | [number, number, number, number];
        }

        interface Treemap<T extends treemap.Node> {
            (root: T, index?: number): T[];

            nodes(root: T, index?: number): T[];

            links(nodes: T[]): treemap.Link<T>[];

            children(): (node: T, depth: number) => T[];
            children(children: (node: T, depth: number) => T[]): Treemap<T>;

            sort(): (a: T, b: T) => number;
            sort(comparator: (a: T, b: T) => number): Treemap<T>;

            value(): (node: T, index: number) => number;
            value(value: (node: T, index: number) => number): Treemap<T>;

            size(): [number, number];
            size(size: [number, number]): Treemap<T>;

            padding(): (node: T, depth: number) => treemap.Padding;
            padding(padding: treemap.Padding): Treemap<T>;
            padding(padding: (node: T, depth: number) => treemap.Padding): Treemap<T>;

            round(): boolean;
            round(round: boolean): Treemap<T>;

            sticky(): boolean;
            sticky(sticky: boolean): boolean;

            mode(): string;
            mode(mode: "squarify"): Treemap<T>;
            mode(mode: "slice"): Treemap<T>;
            mode(mode: "dice"): Treemap<T>;
            mode(mode: "slice-dice"): Treemap<T>;
            mode(mode: string): Treemap<T>;

            ratio(): number;
            ratio(ratio: number): Treemap<T>;
        }
    }

    module geom {
        export function voronoi(): Voronoi<[number, number]>;
        export function voronoi<T>(): Voronoi<T>;

        module voronoi {
            interface Link<T> {
                source: T;
                target: T;
            }
        }

        interface Voronoi<T> {
            (data: T[]): Array<[number, number]>;

            x(): (vertex: T) => number;
            x(x: (vertex: T) => number): Voronoi<T>;

            y(): (vertex: T) => number;
            y(y: (vertex: T) => number): Voronoi<T>;

            clipExtent(): [[number, number], [number, number]];
            clipExtent(extent: [[number, number], [number, number]]): Voronoi<T>;

            links(data: T[]): voronoi.Link<T>[];

            triangles(data: T[]): Array<[T, T, T]>;
        }

        /**
         * @deprecated use d3.geom.voronoi().triangles() instead
         */
        export function delaunay(vertices: Array<[number, number]>): Array<[[number, number], [number, number], [number, number]]>;

        export function quadtree(): Quadtree<[number, number]>;
        export function quadtree<T>(nodes: T[], x1?: number, y1?: number, x2?: number, y2?: number): quadtree.Quadtree<T>;

        module quadtree {
            interface Node<T> {
                nodes: [Node<T>, Node<T>, Node<T>, Node<T>];
                leaf: boolean;
                point: T;
                x: number;
                y: number;
            }

            interface Quadtree<T> extends Node<T> {
                add(point: T): void;
                visit(callback: (node: Node<T>, x1: number, y1: number, x2: number, y2: number) => boolean | void): void;
                find(point: [number, number]): T;
            }
        }

        interface Quadtree<T> {
            (points: T[]): quadtree.Quadtree<T>;

            x(): (datum: T, index: number) => number;
            x(x: number): Quadtree<T>;
            x(x: (datum: T, index: number) => number): Quadtree<T>;

            y(): (datum: T, index: number) => number;
            y(y: number): Quadtree<T>;
            y(y: (datum: T, index: number) => number): Quadtree<T>;

            extent(): [[number, number], [number, number]];
            extent(extent: [[number, number], [number, number]]): Quadtree<T>;
        }

        export function hull(vertices: Array<[number, number]>): Array<[number, number]>;
        export function hull(): Hull<[number, number]>;
        export function hull<T>(): Hull<T>;

        interface Hull<T> {
            (vertices: T[]): Array<[number, number]>;

            x(): (datum: T) => number;
            x(x: (datum: T) => number): Hull<T>;

            y(): (datum: T) => number;
            y(y: (datum: T) => number): Hull<T>;
        }

        export function polygon(vertices: Array<[number, number]>): Polygon;

        interface Polygon {
            area(): number;

            centroid(): [number, number];

            clip(subject: Array<[number, number]>): Array<[number, number]>;
        }
    }
}

// we need this to exist
interface TouchList { }

declare module 'd3' {
    export = d3;
}// Type definitions for es6-promises
// Project: https://github.com/jakearchibald/ES6-Promises
// Definitions by: François de Campredon <https://github.com/fdecampredon/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


interface Thenable<R> {
    then<U>(onFulfilled: (value: R) => Thenable<U>,  onRejected: (error: any) => Thenable<U>): Thenable<U>;
    then<U>(onFulfilled: (value: R) => Thenable<U>, onRejected?: (error: any) => U): Thenable<U>;
    then<U>(onFulfilled: (value: R) => U, onRejected: (error: any) => Thenable<U>): Thenable<U>;
    then<U>(onFulfilled?: (value: R) => U, onRejected?: (error: any) => U): Thenable<U>;
	
}

declare class Promise<R> implements Thenable<R> {
    /**
     * If you call resolve in the body of the callback passed to the constructor, 
     * your promise is fulfilled with result object passed to resolve.
     * If you call reject your promise is rejected with the object passed to resolve. 
     * For consistency and debugging (eg stack traces), obj should be an instanceof Error. 
     * Any errors thrown in the constructor callback will be implicitly passed to reject().
     */
	constructor(callback: (resolve : (result: R) => void, reject: (error: any) => void) => void);
    /**
     * If you call resolve in the body of the callback passed to the constructor, 
     * your promise will be fulfilled/rejected with the outcome of thenable passed to resolve.
     * If you call reject your promise is rejected with the object passed to resolve. 
     * For consistency and debugging (eg stack traces), obj should be an instanceof Error. 
     * Any errors thrown in the constructor callback will be implicitly passed to reject().
     */
	constructor(callback: (resolve : (thenable: Thenable<R>) => void, reject: (error: any) => void) => void);
	
    
    /**
     * onFulFill is called when/if "promise" resolves. onRejected is called when/if "promise" rejects. 
     * Both are optional, if either/both are omitted the next onFulfilled/onRejected in the chain is called. 
     * Both callbacks have a single parameter , the fulfillment value or rejection reason. 
     * "then" returns a new promise equivalent to the value you return from onFulfilled/onRejected after being passed through Promise.resolve. 
     * If an error is thrown in the callback, the returned promise rejects with that error.
     * 
     * @param onFulFill called when/if "promise" resolves
     * @param onReject called when/if "promise" rejects
     */
	then<U>(onFulfill: (value: R) => Thenable<U>,  onReject: (error: any) => Thenable<U>): Promise<U>;
    /**
     * onFulFill is called when/if "promise" resolves. onRejected is called when/if "promise" rejects. 
     * Both are optional, if either/both are omitted the next onFulfilled/onRejected in the chain is called. 
     * Both callbacks have a single parameter , the fulfillment value or rejection reason. 
     * "then" returns a new promise equivalent to the value you return from onFulfilled/onRejected after being passed through Promise.resolve. 
     * If an error is thrown in the callback, the returned promise rejects with that error.
     * 
     * @param onFulFill called when/if "promise" resolves
     * @param onReject called when/if "promise" rejects
     */
    then<U>(onFulfill: (value: R) => Thenable<U>, onReject?: (error: any) => U): Promise<U>;
    /**
     * onFulFill is called when/if "promise" resolves. onRejected is called when/if "promise" rejects. 
     * Both are optional, if either/both are omitted the next onFulfilled/onRejected in the chain is called. 
     * Both callbacks have a single parameter , the fulfillment value or rejection reason. 
     * "then" returns a new promise equivalent to the value you return from onFulfilled/onRejected after being passed through Promise.resolve. 
     * If an error is thrown in the callback, the returned promise rejects with that error.
     * 
     * @param onFulFill called when/if "promise" resolves
     * @param onReject called when/if "promise" rejects
     */
    then<U>(onFulfill: (value: R) => U, onReject: (error: any) => Thenable<U>): Promise<U>;
    /**
     * onFulFill is called when/if "promise" resolves. onRejected is called when/if "promise" rejects. 
     * Both are optional, if either/both are omitted the next onFulfilled/onRejected in the chain is called. 
     * Both callbacks have a single parameter , the fulfillment value or rejection reason. 
     * "then" returns a new promise equivalent to the value you return from onFulfilled/onRejected after being passed through Promise.resolve. 
     * If an error is thrown in the callback, the returned promise rejects with that error.
     * 
     * @param onFulFill called when/if "promise" resolves
     * @param onReject called when/if "promise" rejects
     */
    then<U>(onFulfill?: (value: R) => U, onReject?: (error: any) => U): Promise<U>;
    
    
    /**
     * Sugar for promise.then(undefined, onRejected)
     * 
     * @param onReject called when/if "promise" rejects
     */
	catch<U>(onReject?: (error: any) => Thenable<U>): Promise<U>;
    /**
     * Sugar for promise.then(undefined, onRejected)
     * 
     * @param onReject called when/if "promise" rejects
     */
	catch<U>(onReject?: (error: any) => U): Promise<U>;
}

declare module Promise {
	
	/**
	 * Returns promise (only if promise.constructor == Promise)
	 */
	function cast<R>(promise: Promise<R>): Promise<R>;
    /**
	 * Make a promise that fulfills to obj.
	 */
	function cast<R>(object?: R): Promise<R>;
    
	
    /**
     * Make a new promise from the thenable. 
     * A thenable is promise-like in as far as it has a "then" method. 
     * This also creates a new promise if you pass it a genuine JavaScript promise, making it less efficient for casting than Promise.cast.
     */
	function resolve<R>(thenable: Thenable<R>): Promise<R>;
    /**
     * Make a promise that fulfills to obj. Same as Promise.cast(obj) in this situation.
     */
	function resolve<R>(object?: R): Promise<R>;
    
	/**
	 * Make a promise that rejects to obj. For consistency and debugging (eg stack traces), obj should be an instanceof Error
	 */
	function reject(error?: any): Promise<any>;
	
    /**
     * Make a promise that fulfills when every item in the array fulfills, and rejects if (and when) any item rejects. 
     * the array passed to all can be a mixture of promise-like objects and other objects. 
     * The fulfillment value is an array (in order) of fulfillment values. The rejection value is the first rejection value.
     */
	function all<R>(promises: Promise<R>[]): Promise<R[]>;
	
    /**
     * Make a Promise that fulfills when any item fulfills, and rejects if any item rejects.
     */
	function race<R>(promises: Promise<R>[]): Promise<R>;
}
declare namespace Vidyano {
    class CultureInfo {
        name: string;
        numberFormat: ICultureInfoNumberFormat;
        dateFormat: ICultureInfoDateFormat;
        static currentCulture: CultureInfo;
        static invariantCulture: CultureInfo;
        static cultures: linqjs.Dictionary<string, CultureInfo>;
        constructor(name: string, numberFormat: ICultureInfoNumberFormat, dateFormat: ICultureInfoDateFormat);
    }
    interface ICultureInfoNumberFormat {
        naNSymbol: string;
        negativeSign: string;
        positiveSign: string;
        negativeInfinityText: string;
        positiveInfinityText: string;
        percentSymbol: string;
        percentGroupSizes: Array<number>;
        percentDecimalDigits: number;
        percentDecimalSeparator: string;
        percentGroupSeparator: string;
        percentPositivePattern: string;
        percentNegativePattern: string;
        currencySymbol: string;
        currencyGroupSizes: Array<number>;
        currencyDecimalDigits: number;
        currencyDecimalSeparator: string;
        currencyGroupSeparator: string;
        currencyNegativePattern: string;
        currencyPositivePattern: string;
        numberGroupSizes: Array<number>;
        numberDecimalDigits: number;
        numberDecimalSeparator: string;
        numberGroupSeparator: string;
    }
    interface ICultureInfoDateFormat {
        amDesignator: string;
        pmDesignator: string;
        dateSeparator: string;
        timeSeparator: string;
        gmtDateTimePattern: string;
        universalDateTimePattern: string;
        sortableDateTimePattern: string;
        dateTimePattern: string;
        longDatePattern: string;
        shortDatePattern: string;
        longTimePattern: string;
        shortTimePattern: string;
        yearMonthPattern: string;
        firstDayOfWeek: number;
        dayNames: Array<string>;
        shortDayNames: Array<string>;
        minimizedDayNames: Array<string>;
        monthNames: Array<string>;
        shortMonthNames: Array<string>;
    }
}
declare const unescape: any;
declare const Windows: any;
interface ISet<T> {
    add(value: T): ISet<T>;
    clear(): void;
    delete(value: T): boolean;
    entries(): Array<[T, T]>;
    forEach(callbackfn: (value: T, index: T, set: ISet<T>) => void, thisArg?: any): void;
    has(value: T): boolean;
    keys(): Array<T>;
    size: number;
}
interface ISetConstructor {
    new <T>(): ISet<T>;
    prototype: ISet<any>;
}
declare const Set: ISetConstructor;
declare namespace Vidyano {
    const version: string;
    enum NotificationType {
        Error = 0,
        Notice = 1,
        OK = 2,
        Warning = 3,
    }
    interface ILanguage {
        culture: string;
        name: string;
        isDefault: boolean;
        messages: {
            [key: string]: string;
        };
    }
    interface IProviderParameters {
        label: string;
        description: string;
        requestUri: string;
        signOutUri: string;
        redirectUri: string;
    }
    interface IRoutes {
        programUnits: {
            [name: string]: string;
        };
        persistentObjects: {
            [type: string]: string;
        };
        queries: {
            [type: string]: string;
        };
    }
    function extend(target: any, ...sources: any[]): any;
    function cookie(key: string, value?: any, options?: {
        force?: boolean;
        raw?: boolean;
        path?: string;
        domain?: string;
        secure?: boolean;
        expires?: number | Date;
    }): any;
    function _debounce(func: Function, wait: number, immediate?: boolean): Function;
    namespace Common {
        interface IKeyValuePair {
            key: any;
            value: string;
        }
        interface ISubjectNotifier<TSource, TDetail> {
            notify: (source: TSource, detail?: TDetail) => void;
        }
        class PropertyChangedArgs {
            propertyName: string;
            newValue: any;
            oldValue: any;
            constructor(propertyName: string, newValue: any, oldValue: any);
        }
        interface ISubjectDisposer {
            (): void;
        }
        class Subject<TSource, TDetail> {
            private _observers;
            constructor(notifier: ISubjectNotifier<TSource, TDetail>);
            attach(observer: ISubjectObserver<TSource, TDetail>): ISubjectDisposer;
            private _detach(observerId);
        }
        interface ISubjectObserver<TSource, TDetail> {
            (sender: TSource, detail: TDetail): void;
        }
        class Observable<T> {
            private _propertyChangedNotifier;
            propertyChanged: Vidyano.Common.Subject<T, Vidyano.Common.PropertyChangedArgs>;
            constructor();
            protected notifyPropertyChanged(propertyName: string, newValue: any, oldValue?: any): void;
        }
        interface IPropertyChangedObserver<T> extends ISubjectObserver<T, Vidyano.Common.PropertyChangedArgs> {
        }
    }
    namespace ClientOperations {
        interface IClientOperation {
            type: string;
        }
        interface IRefreshOperation extends IClientOperation {
            delay?: number;
            queryId?: string;
            fullTypeName?: string;
            objectId?: string;
        }
        interface IExecuteMethodOperation extends IClientOperation {
            name: string;
            arguments: any[];
        }
        interface IOpenOperation extends IClientOperation {
            persistentObject: any;
            replace?: boolean;
        }
        function navigate(hooks: ServiceHooks, path: string, replaceCurrent?: boolean): void;
        function reloadPage(): void;
        function showMessageBox(hooks: ServiceHooks, title: string, message: string, html?: boolean, delay?: number): void;
    }
    interface IServiceClientData {
        defaultUser: string;
        exception: string;
        languages: {
            [code: string]: {
                name: string;
                isDefault: boolean;
                messages: {
                    [key: string]: string;
                };
            };
        };
        providers: {
            [name: string]: {
                parameters: IProviderParameters;
            };
        };
    }
    interface IServiceRequest {
        when: Date;
        profiler: IServiceRequestProfiler;
        transport: number;
        method: string;
        request: any;
        response: any;
    }
    interface IServiceRequestProfiler {
        taskId: number;
        elapsedMilliseconds: number;
        entries: IServiceRequestProfilerEntry[];
        sql: IServiceRequestProfilerSQL[];
        exceptions: {
            id: string;
            message: string;
        }[];
    }
    interface IServiceRequestProfilerEntry {
        entries: IServiceRequestProfilerEntry[];
        methodName: string;
        sql: string[];
        started: number;
        elapsedMilliseconds: number;
        hasNPlusOne?: boolean;
        exception: string;
        arguments: any[];
    }
    interface IServiceRequestProfilerSQL {
        commandId: string;
        commandText: string;
        elapsedMilliseconds: number;
        recordsAffected: number;
        taskId: number;
        type: string;
        parameters: IServiceRequestProfilerSQLParameter[];
    }
    interface IServiceRequestProfilerSQLParameter {
        name: string;
        type: string;
        value: string;
    }
    class Service extends Vidyano.Common.Observable<Service> {
        serviceUri: string;
        hooks: ServiceHooks;
        private _forceUser;
        private static _getMs;
        private static _base64KeyStr;
        private _lastAuthTokenUpdate;
        private _isUsingDefaultCredentials;
        private _clientData;
        private _language;
        private _languages;
        private _windowsAuthentication;
        private _providers;
        private _isSignedIn;
        private _application;
        private _profile;
        private _profiledRequests;
        staySignedIn: boolean;
        icons: linqjs.Dictionary<string, string>;
        actionDefinitions: linqjs.Dictionary<string, ActionDefinition>;
        environment: string;
        environmentVersion: string;
        ignoreMobile: boolean;
        constructor(serviceUri: string, hooks?: ServiceHooks, _forceUser?: string);
        private _createUri(method);
        private _createData(method, data?);
        private _getMs();
        private _postJSON(url, data);
        private _postJSONProcess(data, result, requestMethod, createdRequest, requestStart, elapsedMs);
        private _getJSON(url);
        private static _decodeBase64(input);
        private static _getServiceTimeString;
        _getStream(obj: PersistentObject, action?: string, parent?: PersistentObject, query?: Query, selectedItems?: Array<QueryResultItem>, parameters?: any): void;
        application: Application;
        private _setApplication(application);
        language: ILanguage;
        isSignedIn: boolean;
        private _setIsSignedIn(val);
        languages: ILanguage[];
        windowsAuthentication: boolean;
        providers: {
            [name: string]: IProviderParameters;
        };
        isUsingDefaultCredentials: boolean;
        private _setIsUsingDefaultCredentials(val);
        userName: string;
        private _setUserName(val);
        defaultUserName: string;
        private authToken;
        profile: boolean;
        profiledRequests: IServiceRequest[];
        private _setProfiledRequests(requests);
        getTranslatedMessage(key: string, ...params: string[]): string;
        initialize(skipDefaultCredentialLogin?: boolean): Promise<Application>;
        signInExternal(providerName: string): void;
        signInUsingCredentials(userName: string, password: string): Promise<Application>;
        signInUsingDefaultCredentials(): Promise<Application>;
        signOut(): void;
        private _getApplication(data?);
        getQuery(id: string, asLookup?: boolean): Promise<Query>;
        getPersistentObject(parent: PersistentObject, id: string, objectId?: string): Promise<PersistentObject>;
        executeQuery(parent: PersistentObject, query: Query, asLookup?: boolean): Promise<any>;
        executeAction(action: string, parent: PersistentObject, query: Query, selectedItems: Array<QueryResultItem>, parameters?: any, skipHooks?: boolean): Promise<PersistentObject>;
        static getDate: (yearString: string, monthString: string, dayString: string, hourString: string, minuteString: string, secondString: string, msString: string) => Date;
        static fromServiceString(value: string, typeName: string): any;
        static toServiceString(value: any, typeName: string): string;
        static numericTypes: string[];
        static isNumericType(type: string): boolean;
        static dateTimeTypes: string[];
        static isDateTimeType(type: string): boolean;
    }
    class ServiceHooks {
        private _service;
        service: Vidyano.Service;
        createData(data: any): void;
        setNotification(notification: string, type: NotificationType): void;
        trackEvent(name: string, option: string, owner: ServiceObjectWithActions): void;
        onInitialize(clientData: IServiceClientData): void;
        onSessionExpired(): void;
        onActionConfirmation(action: Action, option: number): Promise<boolean>;
        onAction(args: ExecuteActionArgs): Promise<any>;
        onOpen(obj: ServiceObject, replaceCurrent?: boolean, fromAction?: boolean): void;
        onClose(obj: ServiceObject): void;
        onConstructPersistentObject(service: Service, po: any): PersistentObject;
        onConstructPersistentObjectAttributeTab(service: Service, groups: linqjs.Enumerable<PersistentObjectAttributeGroup>, key: string, id: string, name: string, layout: any, parent: PersistentObject, columnCount: number, isVisible: boolean): PersistentObjectAttributeTab;
        onConstructPersistentObjectQueryTab(service: Service, query: Query): PersistentObjectQueryTab;
        onConstructPersistentObjectAttributeGroup(service: Service, key: string, attributes: linqjs.Enumerable<PersistentObjectAttribute>, parent: PersistentObject): PersistentObjectAttributeGroup;
        onConstructPersistentObjectAttribute(service: Service, attr: any, parent: PersistentObject): PersistentObjectAttribute;
        onConstructPersistentObjectAttributeWithReference(service: Service, attr: any, parent: PersistentObject): PersistentObjectAttributeWithReference;
        onConstructPersistentObjectAttributeAsDetail(service: Service, attr: any, parent: PersistentObject): PersistentObjectAttributeAsDetail;
        onConstructQuery(service: Service, query: any, parent?: PersistentObject, asLookup?: boolean, maxSelectedItems?: number): Query;
        onConstructQueryResultItem(service: Service, item: any, query: Query, isSelected?: boolean): QueryResultItem;
        onConstructQueryResultItemValue(service: Service, item: QueryResultItem, value: any): QueryResultItemValue;
        onConstructQueryColumn(service: Service, col: any, query: Query): QueryColumn;
        onConstructAction(service: Service, action: Action): Action;
        onMessageDialog(title: string, message: string, html: boolean, ...actions: string[]): Promise<number>;
        onSelectReference(query: Vidyano.Query): Promise<QueryResultItem[]>;
        onNavigate(path: string, replaceCurrent?: boolean): void;
        onClientOperation(operation: ClientOperations.IClientOperation): void;
        onSelectedItemsActions(query: Query, selectedItems: QueryResultItem[], action: ISelectedItemsActionArgs): void;
    }
    interface ISelectedItemsActionArgs {
        name: string;
        isVisible: boolean;
        canExecute: boolean;
        options: string[];
    }
    class ExecuteActionArgs {
        private service;
        persistentObject: PersistentObject;
        query: Query;
        selectedItems: Array<QueryResultItem>;
        parameters: any;
        private _action;
        action: string;
        isHandled: boolean;
        result: PersistentObject;
        constructor(service: Service, action: string, persistentObject: PersistentObject, query: Query, selectedItems: Array<QueryResultItem>, parameters: any);
        executeServiceRequest(): Promise<PersistentObject>;
    }
    interface IServiceObjectPropertyChangedObserver extends Common.IPropertyChangedObserver<ServiceObject> {
    }
    class ServiceObject extends Vidyano.Common.Observable<ServiceObject> {
        service: Service;
        constructor(service: Service);
        copyProperties(propertyNames: Array<string>, includeNullValues?: boolean, result?: any): any;
    }
    class ServiceObjectWithActions extends ServiceObject {
        private _actionNames;
        private _queue;
        private _isBusy;
        notification: string;
        notificationType: NotificationType;
        actions: Action[];
        constructor(service: Service, _actionNames?: string[]);
        isBusy: boolean;
        private _setIsBusy(val);
        setNotification(notification?: string, type?: NotificationType): void;
        queueWork<T>(work: () => Promise<T>, blockActions?: boolean): Promise<T>;
        protected _initializeActions(): void;
        private _blockActions(block);
    }
    enum PersistentObjectLayoutMode {
        FullPage = 0,
        MasterDetail = 1,
    }
    class PersistentObject extends ServiceObjectWithActions {
        private _isSystem;
        private _lastResult;
        private _lastResultBackup;
        private securityToken;
        private _isEditing;
        private _isDirty;
        private _inputs;
        private _id;
        private _type;
        private _breadcrumb;
        private _isDeleted;
        private _tabs;
        fullTypeName: string;
        label: string;
        objectId: string;
        isHidden: boolean;
        isNew: boolean;
        isReadOnly: boolean;
        queryLayoutMode: PersistentObjectLayoutMode;
        newOptions: string;
        ignoreCheckRules: boolean;
        stateBehavior: string;
        parent: PersistentObject;
        ownerDetailAttribute: PersistentObjectAttributeAsDetail;
        ownerAttributeWithReference: PersistentObjectAttributeWithReference;
        ownerPersistentObject: PersistentObject;
        ownerQuery: Query;
        bulkObjectIds: string;
        queriesToRefresh: Array<string>;
        attributes: PersistentObjectAttribute[];
        queries: Query[];
        constructor(service: Service, po: any);
        private _createPersistentObjectAttribute(attr);
        id: string;
        isSystem: boolean;
        type: string;
        isBulkEdit: boolean;
        tabs: PersistentObjectTab[];
        isEditing: boolean;
        private setIsEditing(value);
        breadcrumb: string;
        private _setBreadcrumb(breadcrumb);
        isDirty: boolean;
        private _setIsDirty(value);
        isDeleted: boolean;
        getAttribute(name: string): PersistentObjectAttribute;
        getAttributeValue(name: string): any;
        getQuery(name: string): Query;
        beginEdit(): void;
        cancelEdit(): void;
        save(waitForOwnerQuery?: boolean): Promise<boolean>;
        getRegisteredInputs(): linqjs.Enumerable<linqjs.KeyValuePair<string, HTMLInputElement>>;
        hasRegisteredInput(attributeName: string): boolean;
        registerInput(attributeName: string, input: HTMLInputElement): void;
        clearRegisteredInputs(attributeName?: string): void;
        toServiceObject(skipParent?: boolean): any;
        refreshFromResult(result: PersistentObject): void;
        triggerDirty(): void;
        _triggerAttributeRefresh(attr: PersistentObjectAttribute): Promise<boolean>;
        _prepareAttributesForRefresh(sender: PersistentObjectAttribute): void;
    }
    class PersistentObjectAttribute extends ServiceObject {
        parent: PersistentObject;
        private _isSystem;
        private _lastParsedValue;
        private _cachedValue;
        private _serviceValue;
        private _serviceOptions;
        private _displayValueSource;
        private _displayValue;
        private _validationError;
        private _tab;
        private _tabKey;
        private _group;
        private _groupKey;
        private _isRequired;
        private _isReadOnly;
        private _isValueChanged;
        protected _queueRefresh: boolean;
        private _refreshValue;
        id: string;
        name: string;
        label: string;
        options: string[] | Common.IKeyValuePair[];
        offset: number;
        type: string;
        toolTip: string;
        rules: string;
        visibility: string;
        typeHints: any;
        editTemplateKey: string;
        templateKey: string;
        disableSort: boolean;
        triggersRefresh: boolean;
        column: number;
        columnSpan: number;
        constructor(service: Service, attr: any, parent: PersistentObject);
        groupKey: string;
        group: PersistentObjectAttributeGroup;
        tabKey: string;
        tab: PersistentObjectAttributeTab;
        isSystem: boolean;
        isVisible: boolean;
        validationError: string;
        isRequired: boolean;
        private _setIsRequired(isRequired);
        isReadOnly: boolean;
        private _setIsReadOnly(isReadOnly);
        displayValue: string;
        value: any;
        setValue(val: any, allowRefresh?: boolean): Promise<any>;
        isValueChanged: boolean;
        getTypeHint(name: string, defaultValue?: string, typeHints?: any, ignoreCasing?: boolean): string;
        getRegisteredInput(): HTMLInputElement;
        registerInput(input: HTMLInputElement): void;
        clearRegisteredInput(): void;
        _toServiceObject(): any;
        _refreshFromResult(resultAttr: PersistentObjectAttribute): boolean;
        protected _triggerAttributeRefresh(): Promise<any>;
        private _setOptions(options);
    }
    class PersistentObjectAttributeWithReference extends PersistentObjectAttribute {
        parent: PersistentObject;
        lookup: Query;
        objectId: string;
        displayAttribute: string;
        canAddNewReference: boolean;
        selectInPlace: boolean;
        constructor(service: Service, attr: any, parent: PersistentObject);
        addNewReference(): void;
        changeReference(selectedItems: QueryResultItem[] | string[]): Promise<boolean>;
        getPersistentObject(): Promise<Vidyano.PersistentObject>;
        _refreshFromResult(resultAttr: PersistentObjectAttribute): boolean;
    }
    class PersistentObjectAttributeAsDetail extends PersistentObjectAttribute {
        parent: PersistentObject;
        private _objects;
        details: Query;
        lookupAttribute: string;
        constructor(service: Service, attr: any, parent: PersistentObject);
        objects: Vidyano.PersistentObject[];
        private _setObjects(objects);
        _refreshFromResult(resultAttr: PersistentObjectAttribute): boolean;
        _toServiceObject(): any;
        onChanged(allowRefresh: boolean): Promise<any>;
    }
    class PersistentObjectTab extends Common.Observable<PersistentObjectTab> {
        service: Service;
        name: string;
        label: string;
        target: ServiceObjectWithActions;
        parent: PersistentObject;
        private _isVisible;
        tabGroupIndex: number;
        constructor(service: Service, name: string, label: string, target: ServiceObjectWithActions, parent?: PersistentObject, _isVisible?: boolean);
        isVisible: boolean;
    }
    class PersistentObjectAttributeTab extends PersistentObjectTab {
        private _groups;
        key: string;
        id: string;
        private _layout;
        columnCount: number;
        private _attributes;
        constructor(service: Service, _groups: PersistentObjectAttributeGroup[], key: string, id: string, name: string, _layout: any, po: PersistentObject, columnCount: number, isVisible: boolean);
        layout: any;
        private _setLayout(layout);
        attributes: PersistentObjectAttribute[];
        groups: PersistentObjectAttributeGroup[];
        saveLayout(layout: any): Promise<any>;
        private _updateAttributes();
    }
    class PersistentObjectQueryTab extends PersistentObjectTab {
        query: Query;
        constructor(service: Service, query: Query);
    }
    class PersistentObjectAttributeGroup extends Vidyano.Common.Observable<PersistentObjectAttributeGroup> {
        service: Service;
        key: string;
        parent: PersistentObject;
        private _attributes;
        label: string;
        index: number;
        constructor(service: Service, key: string, _attributes: PersistentObjectAttribute[], parent: PersistentObject);
        attributes: PersistentObjectAttribute[];
    }
    enum SortDirection {
        None = 0,
        Ascending = 1,
        Descending = 2,
    }
    interface ISortOption {
        column: QueryColumn;
        direction: SortDirection;
    }
    interface IQuerySelectAll {
        isAvailable: boolean;
        allSelected: boolean;
        inverse: boolean;
    }
    class Query extends ServiceObjectWithActions {
        parent: PersistentObject;
        maxSelectedItems: number;
        private _lastResult;
        private _asLookup;
        private _isSelectionModifying;
        private _totalItems;
        private _labelWithTotalItems;
        private _sortOptions;
        private _queriedPages;
        private _filters;
        private _canFilter;
        private _canRead;
        private _canReorder;
        private _charts;
        private _defaultChartName;
        private _currentChart;
        private _lastUpdated;
        private _totalItem;
        private _isSystem;
        persistentObject: PersistentObject;
        columns: QueryColumn[];
        id: string;
        name: string;
        autoQuery: boolean;
        isHidden: boolean;
        hasSearched: boolean;
        label: string;
        singularLabel: string;
        offset: number;
        textSearch: string;
        pageSize: number;
        skip: number;
        top: number;
        items: QueryResultItem[];
        groupingInfo: {
            groupedBy: string;
            type: string;
            groups: {
                name: string;
                start: number;
                count: number;
                end: number;
            }[];
        };
        selectAll: IQuerySelectAll;
        constructor(service: Service, query: any, parent?: PersistentObject, asLookup?: boolean, maxSelectedItems?: number);
        isSystem: boolean;
        filters: QueryFilters;
        canFilter: boolean;
        private _setCanFilter(val);
        canRead: boolean;
        canReorder: boolean;
        charts: linqjs.Enumerable<QueryChart>;
        private _setCharts(charts);
        currentChart: QueryChart;
        defaultChartName: string;
        lastUpdated: Date;
        private _setLastUpdated(date?);
        selectedItems: QueryResultItem[];
        private _selectAllPropertyChanged(selectAll, args);
        selectRange(from: number, to: number): boolean;
        asLookup: boolean;
        totalItems: number;
        labelWithTotalItems: string;
        sortOptions: ISortOption[];
        totalItem: QueryResultItem;
        private _setTotalItem(item);
        reorder(before: QueryResultItem, item: QueryResultItem, after: QueryResultItem): Promise<QueryResultItem[]>;
        private _setSortOptionsFromService(options);
        private _setTotalItems(items);
        _toServiceObject(): any;
        _setResult(result: any): void;
        getColumn(name: string): QueryColumn;
        getItemsInMemory(start: number, length: number): QueryResultItem[];
        getItems(start: number, length?: number, skipQueue?: boolean): Promise<QueryResultItem[]>;
        search(delay?: number): Promise<QueryResultItem[]>;
        clone(asLookup?: boolean): Query;
        private _updateColumns(_columns?);
        private _updateItems(items, reset?);
        private _notifyItemSelectionChanged(item);
        private _updateSelectAll(item?, selectedItems?);
        static FromJsonData(service: Service, data: IJsonQueryData): Query;
    }
    interface IJsonQueryData {
        id?: string;
        name?: string;
        label?: string;
        singularLabel?: string;
        items: {
            id: string | number;
            breadcrumb?: string;
            typeHints?: {
                [name: string]: string;
            };
            values: {
                key: string;
                value: string;
                typeHints?: {
                    [name: string]: string;
                };
            }[];
        }[];
        columns: {
            name: string;
            label: string;
            type: string;
            width?: string;
            typeHints?: {
                [name: string]: string;
            };
        }[];
    }
    class QueryColumn extends ServiceObject {
        query: Query;
        private displayAttribute;
        private _sortDirection;
        private _canSort;
        private _canFilter;
        private _canListDistincts;
        private _name;
        private _type;
        private _label;
        private _distincts;
        private _selectedDistincts;
        private _selectedDistinctsInversed;
        private _total;
        offset: number;
        isPinned: boolean;
        isHidden: boolean;
        width: string;
        typeHints: any;
        constructor(service: Service, col: any, query: Query);
        name: string;
        type: string;
        label: string;
        canFilter: boolean;
        canSort: boolean;
        canListDistincts: boolean;
        isSorting: boolean;
        sortDirection: SortDirection;
        selectedDistincts: linqjs.Enumerable<string>;
        selectedDistinctsInversed: boolean;
        distincts: IQueryColumnDistincts;
        total: QueryResultItemValue;
        private _setTotal(total);
        private _setSortDirection(direction);
        _toServiceObject(): any;
        getTypeHint(name: string, defaultValue?: string, typeHints?: any, ignoreCasing?: boolean): string;
        refreshDistincts(): Promise<IQueryColumnDistincts>;
        sort(direction: SortDirection, multiSort?: boolean): Promise<QueryResultItem[]>;
        private _queryPropertyChanged(sender, args);
    }
    interface IQueryColumnDistincts {
        matching: string[];
        remaining: string[];
        isDirty: boolean;
        hasMore: boolean;
    }
    class QueryResultItem extends ServiceObject {
        query: Query;
        private _isSelected;
        id: string;
        breadcrumb: string;
        rawValues: linqjs.Enumerable<QueryResultItemValue>;
        typeHints: any;
        private _fullValuesByName;
        private _values;
        constructor(service: Service, item: any, query: Query, _isSelected: boolean);
        values: any;
        isSelected: boolean;
        getValue(key: string): any;
        getFullValue(key: string): QueryResultItemValue;
        getTypeHint(name: string, defaultValue?: string, typeHints?: any): string;
        getPersistentObject(): Promise<PersistentObject>;
        _toServiceObject(): any;
    }
    class QueryResultItemValue extends ServiceObject {
        private _item;
        private _value;
        private _valueParsed;
        key: string;
        value: string;
        typeHints: any;
        persistentObjectId: string;
        objectId: string;
        constructor(service: Service, _item: QueryResultItem, value: any);
        getTypeHint(name: string, defaultValue?: string, typeHints?: any): string;
        getValue(): any;
        _toServiceObject(): any;
    }
    class QueryFilters extends Vidyano.Common.Observable<QueryFilters> {
        private _query;
        private _filtersPO;
        private _filters;
        private _currentFilter;
        private _filtersAsDetail;
        private _skipSearch;
        constructor(_query: Query, _filtersPO: Vidyano.PersistentObject);
        filters: QueryFilter[];
        private _setFilters(filters);
        currentFilter: QueryFilter;
        private _computeFilters(setDefaultFilter?);
        private _computeFilterData();
        getFilter(name: string): QueryFilter;
        createNew(): Promise<QueryFilter>;
        save(filter?: QueryFilter): Promise<QueryFilter>;
        delete(name: string): Promise<any>;
    }
    class QueryFilter extends Vidyano.Common.Observable<QueryFilter> {
        private _po;
        constructor(_po: PersistentObject);
        name: string;
        isLocked: boolean;
        isDefault: boolean;
        persistentObject: PersistentObject;
    }
    class QueryChart extends Vidyano.Common.Observable<QueryChart> {
        private _query;
        private _label;
        private _name;
        private _options;
        private _type;
        constructor(_query: Vidyano.Query, _label: string, _name: string, _options: any, _type: string);
        query: Vidyano.Query;
        label: string;
        name: string;
        options: any;
        type: string;
        execute(parameters?: any): Promise<any>;
    }
    class Action extends ServiceObject {
        service: Service;
        definition: ActionDefinition;
        owner: ServiceObjectWithActions;
        private _targetType;
        private _query;
        private _parent;
        private _isVisible;
        private _canExecute;
        private _block;
        private _parameters;
        private _offset;
        protected _isPinned: boolean;
        private _options;
        skipOpen: boolean;
        selectionRule: (count: number) => boolean;
        displayName: string;
        dependentActions: any[];
        constructor(service: Service, definition: ActionDefinition, owner: ServiceObjectWithActions);
        parent: PersistentObject;
        query: Query;
        offset: number;
        name: string;
        canExecute: boolean;
        block: boolean;
        isVisible: boolean;
        isPinned: boolean;
        options: string[];
        private _setOptions(options);
        execute(option?: number, parameters?: any, selectedItems?: QueryResultItem[], throwExceptions?: boolean): Promise<PersistentObject>;
        _onExecute(option?: number, parameters?: any, selectedItems?: QueryResultItem[]): Promise<PersistentObject>;
        _getParameters(parameters: any, option: any): any;
        _onParentIsEditingChanged(isEditing: boolean): void;
        _onParentIsDirtyChanged(isDirty: boolean): void;
        private _setNotification(notification?, notificationType?);
        static get(service: Service, name: string, owner: ServiceObjectWithActions): Action;
        static addActions(service: Service, owner: ServiceObjectWithActions, actions: Action[], actionNames: string[]): void;
    }
    namespace Actions {
        class RefreshQuery extends Action {
            constructor(service: Service, definition: ActionDefinition, owner: ServiceObjectWithActions);
            _onExecute(option?: number, parameters?: any, selectedItems?: QueryResultItem[]): Promise<any>;
        }
        class Filter extends Action {
            constructor(service: Service, definition: ActionDefinition, owner: ServiceObjectWithActions);
        }
        class Edit extends Action {
            constructor(service: Service, definition: ActionDefinition, owner: ServiceObjectWithActions);
            _onParentIsEditingChanged(isEditing: boolean): void;
            _onExecute(option?: number, parameters?: any, selectedItems?: QueryResultItem[]): Promise<PersistentObject>;
        }
        class EndEdit extends Action {
            constructor(service: Service, definition: ActionDefinition, owner: ServiceObjectWithActions);
            _onParentIsEditingChanged(isEditing: boolean): void;
            _onParentIsDirtyChanged(isDirty: boolean): void;
            _onExecute(option?: number, parameters?: any, selectedItems?: QueryResultItem[]): Promise<PersistentObject>;
        }
        class Save extends Action {
            constructor(service: Service, definition: ActionDefinition, owner: ServiceObjectWithActions);
            _onExecute(option?: number, parameters?: any, selectedItems?: QueryResultItem[]): Promise<PersistentObject>;
        }
        class CancelSave extends Action {
            constructor(service: Service, definition: ActionDefinition, owner: ServiceObjectWithActions);
            _onExecute(option?: number, parameters?: any, selectedItems?: QueryResultItem[]): Promise<PersistentObject>;
        }
        class CancelEdit extends Action {
            constructor(service: Service, definition: ActionDefinition, owner: ServiceObjectWithActions);
            _onParentIsEditingChanged(isEditing: boolean): void;
            _onParentIsDirtyChanged(isDirty: boolean): void;
            _onExecute(option?: number, parameters?: any, selectedItems?: QueryResultItem[]): Promise<PersistentObject>;
        }
        class ExportToExcel extends Action {
            constructor(service: Service, definition: ActionDefinition, owner: ServiceObjectWithActions);
            _onExecute(option?: number, parameters?: any, selectedItems?: QueryResultItem[]): Promise<PersistentObject>;
        }
        class ShowHelp extends Action {
            constructor(service: Service, definition: ActionDefinition, owner: ServiceObjectWithActions);
            _onExecute(option?: number, parameters?: any, selectedItems?: QueryResultItem[]): Promise<PersistentObject>;
        }
        class viSearch extends Action {
            constructor(service: Service, definition: ActionDefinition, owner: ServiceObjectWithActions);
        }
    }
    class ActionDefinition {
        private _name;
        private _displayName;
        private _isPinned;
        private _refreshQueryOnCompleted;
        private _offset;
        private _iconData;
        private _reverseIconData;
        private _confirmation;
        private _options;
        private _selectionRule;
        constructor(service: Service, item: QueryResultItem);
        name: string;
        displayName: string;
        isPinned: boolean;
        refreshQueryOnCompleted: boolean;
        offset: number;
        iconData: string;
        reverseIconData: string;
        confirmation: string;
        options: Array<string>;
        selectionRule: (count: number) => boolean;
    }
    class Application extends PersistentObject {
        private _userId;
        private _friendlyUserName;
        private _feedbackId;
        private _userSettingsId;
        private _globalSearchId;
        private _analyticsKey;
        private _userSettings;
        private _canProfile;
        private _hasManagement;
        private _session;
        private _routes;
        private _poRe;
        private _queryRe;
        programUnits: ProgramUnit[];
        constructor(service: Service, po: any);
        userId: string;
        friendlyUserName: string;
        feedbackId: string;
        userSettingsId: string;
        globalSearchId: string;
        analyticsKey: string;
        userSettings: any;
        canProfile: boolean;
        hasManagement: boolean;
        session: Vidyano.PersistentObject;
        routes: IRoutes;
        poRe: RegExp;
        queryRe: RegExp;
        saveUserSettings(): Promise<any>;
        _updateSession(session: any): void;
    }
    class ProgramUnitItem extends ServiceObject {
        path: string;
        id: string;
        title: string;
        name: string;
        constructor(service: Service, unitItem: any, path?: string);
    }
    class ProgramUnit extends ProgramUnitItem {
        private _id;
        offset: number;
        openFirst: boolean;
        items: ProgramUnitItem[];
        constructor(service: Service, routes: IRoutes, unit: any);
        private _createItem(routes, itemData);
    }
    class ProgramUnitItemGroup extends ProgramUnitItem {
        items: ProgramUnitItem[];
        constructor(service: Service, unitItem: any, items: ProgramUnitItem[]);
    }
    class ProgramUnitItemQuery extends ProgramUnitItem {
        queryId: string;
        constructor(service: Service, routes: IRoutes, unitItem: any, parent: ProgramUnit);
        private static _getPath(routes, id);
    }
    class ProgramUnitItemPersistentObject extends ProgramUnitItem {
        persistentObjectId: string;
        persistentObjectObjectId: string;
        constructor(service: Service, routes: IRoutes, unitItem: any, parent: ProgramUnit);
        private static _getPath(routes, id, objectId);
    }
    class ProgramUnitItemUrl extends ProgramUnitItem {
        constructor(service: Service, unitItem: any);
    }
    class NoInternetMessage {
        private language;
        title: string;
        message: string;
        tryAgain: string;
        static messages: linqjs.Dictionary<string, NoInternetMessage>;
        constructor(language: string, title: string, message: string, tryAgain: string);
        private static _getMessages();
    }
}
declare namespace Vidyano.WebComponents {
    class ActionBar extends WebComponent {
        accent: boolean;
        serviceObject: Vidyano.ServiceObjectWithActions;
        pinnedActions: Vidyano.Action[];
        unpinnedActions: Vidyano.Action[];
        canSearch: boolean;
        private _setHasCharts;
        executeAction(e: Event, details: any, sender: HTMLElement): void;
        filterActions(actions: Vidyano.Action[], pinned: boolean): Vidyano.Action[];
        private _serviceObjectChanged(serviceObject);
        private _computeHasCharts(charts, isAttached);
        private _search();
        private _computePinnedActions();
        private _computeUnpinnedActions();
        private _computeCanSearch(serviceObject);
        private _computeNoActions(pinnedActions, unpinnedActions);
    }
}
declare namespace Vidyano.WebComponents {
    class ActionButton extends WebComponent {
        item: Vidyano.QueryResultItem;
        action: Action;
        private _skipObserver;
        options: linqjs.KeyValuePair<number, string>[];
        canExecute: boolean;
        noLabel: boolean;
        openOnHover: boolean;
        forceLabel: boolean;
        private _setCanExecute;
        private _setHidden;
        private _setOptions;
        private _setSiblingIcon;
        constructor(item: Vidyano.QueryResultItem, action: Action);
        private _onExecuteWithoutOptions(e);
        private _onExecuteWithOption(e);
        private _execute(option?);
        private _observeAction(canExecute, isVisible, options);
        private _computeDisabled(canExecute);
        private _computeTitle(action, pinned);
        private _computeIcon(action);
        private _computeHasIcon(icon);
        private _computeIconSpace(icon, siblingIcon, overflow);
        private _computeSiblingIcon(overflow, isAttached);
        private _computeOpenOnHover(overflow, openOnHover);
    }
}
declare namespace Vidyano.WebComponents {
    class AppConfig extends WebComponent {
        private _defaultAttributeConfig;
        private _persistentObjectConfigs;
        private _attributeConfigs;
        private _tabConfigs;
        private _programUnitConfigs;
        private _queryConfigs;
        private _queryChartConfigs;
        attached(): void;
        getSetting(key: string, defaultValue?: string): string;
        getPersistentObjectConfig(persistentObject: Vidyano.PersistentObject): PersistentObjectConfig;
        getAttributeConfig(attr: Vidyano.PersistentObjectAttribute): PersistentObjectAttributeConfig;
        getTabConfig(tab: Vidyano.PersistentObjectTab): PersistentObjectTabConfig;
        getProgramUnitConfig(name: string): ProgramUnitConfig;
        getQueryConfig(query: Vidyano.Query): QueryConfig;
        getQueryChartConfig(type: string): QueryChartConfig;
        private _getConfigs<T>(type);
    }
}
declare namespace Vidyano.WebComponents {
    class AppSetting extends WebComponent {
        key: string;
        value: string;
    }
}
declare namespace Vidyano.WebComponents {
    class PersistentObjectAttributeConfig extends TemplateConfig<Vidyano.PersistentObjectAttribute> {
        private _calculateHeight;
        private _calculateWidth;
        private height;
        private width;
        type: string;
        name: string;
        parentId: string;
        parentObjectId: string;
        component: string;
        calculateHeight(attr: Vidyano.PersistentObjectAttribute): number;
        calculateWidth(attr: Vidyano.PersistentObjectAttribute): number;
    }
}
declare namespace Vidyano.WebComponents {
    class PersistentObjectConfig extends TemplateConfig<Vidyano.PersistentObject> {
        id: string;
        objectId: string;
    }
}
declare namespace Vidyano.WebComponents {
    class PersistentObjectTabConfig extends TemplateConfig<Vidyano.PersistentObjectTab> {
        name: string;
        type: string;
        objectId: string;
    }
}
declare namespace Vidyano.WebComponents {
    class ProgramUnitConfig extends TemplateConfig<Vidyano.ProgramUnit> {
        name: string;
    }
}
declare namespace Vidyano.WebComponents {
    class QueryChartConfig extends TemplateConfig<Vidyano.QueryChart> {
        type: string;
    }
}
declare namespace Vidyano.WebComponents {
    class QueryConfig extends TemplateConfig<Vidyano.Query> {
        name: string;
        id: string;
        defaultChart: string;
    }
}
declare namespace Vidyano.WebComponents {
    abstract class TemplateConfig<T> extends WebComponent {
        private _template;
        hasTemplate: boolean;
        as: string;
        asModel: (model: T) => any;
        private _setHasTemplate;
        attached(): void;
        stamp(obj: T, as?: string, asModel?: (model: T) => any): DocumentFragment;
        static register(info?: IWebComponentRegistrationInfo): (obj: any) => void;
    }
}
declare var _gaq: any[];
declare namespace Vidyano.WebComponents {
    const hashBang: string;
    const hashBangRe: RegExp;
    class AppCacheEntry {
        id: string;
        constructor(id: string);
        isMatch(entry: AppCacheEntry): boolean;
    }
    class PersistentObjectAppCacheEntry extends AppCacheEntry {
        objectId: string;
        private _persistentObject;
        selectedMasterTab: Vidyano.PersistentObjectTab;
        selectedDetailTab: Vidyano.PersistentObjectTab;
        constructor(idOrPo: string | Vidyano.PersistentObject, objectId?: string);
        persistentObject: Vidyano.PersistentObject;
        isMatch(entry: PersistentObjectAppCacheEntry): boolean;
    }
    class PersistentObjectFromActionAppCacheEntry extends PersistentObjectAppCacheEntry {
        fromActionId: string;
        fromActionIdReturnPath: string;
        constructor(po: Vidyano.PersistentObject, fromActionId?: string, fromActionIdReturnPath?: string);
        isMatch(entry: PersistentObjectFromActionAppCacheEntry): boolean;
    }
    class QueryAppCacheEntry extends AppCacheEntry {
        query: Vidyano.Query;
        constructor(idOrQuery: string | Vidyano.Query);
        isMatch(entry: QueryAppCacheEntry): boolean;
    }
    class App extends WebComponent {
        private _cache;
        private _initializationError;
        private _routeMap;
        private _routeUpdater;
        private _keybindingRegistrations;
        private routeMapVersion;
        private _configuration;
        private _beforeUnloadEventHandler;
        service: Vidyano.Service;
        programUnit: ProgramUnit;
        currentRoute: AppRoute;
        initializing: boolean;
        uri: string;
        hooks: string;
        noHistory: boolean;
        path: string;
        cacheSize: number;
        noMenu: boolean;
        label: string;
        keys: string;
        private _setInitializing;
        private _setRouteMapVersion;
        private _setKeys;
        private _setProgramUnit;
        private _setCurrentRoute;
        private _setProfilerLoaded;
        attached(): void;
        configuration: AppConfig;
        initializationError: string;
        changePath(path: string, replaceCurrent?: boolean): void;
        getUrlForPersistentObject(id: string, objectId: string, pu?: ProgramUnit): string;
        getUrlForQuery(id: string, pu?: ProgramUnit): string;
        getUrlForFromAction(id: string, pu?: ProgramUnit): string;
        cache(entry: Vidyano.WebComponents.AppCacheEntry): Vidyano.WebComponents.AppCacheEntry;
        cachePing(entry: Vidyano.WebComponents.AppCacheEntry): Vidyano.WebComponents.AppCacheEntry;
        cacheRemove(key: Vidyano.WebComponents.AppCacheEntry): void;
        cacheEntries: Vidyano.WebComponents.AppCacheEntry[];
        cacheClear(): void;
        createServiceHooks(): ServiceHooks;
        redirectToSignIn(keepUrl?: boolean): void;
        redirectToNotFound(): void;
        redirectToError(message: string, replaceCurrent?: boolean): void;
        showDialog(dialog: Dialog, options?: Vidyano.WebComponents.IDialogOptions): Promise<any>;
        showMessageDialog(options: Vidyano.WebComponents.IMessageDialogOptions): Promise<any>;
        private _computeIsProfiling(isSignedIn, profile, profilerLoaded);
        private _computeService(uri, user);
        private _onInitialized();
        private _convertPath(application, path);
        private _updateRoute(path, initializing, routeMapVersion);
        private _appRouteAdded(e, detail);
        private _computeProgramUnit(application, path);
        private _computeShowMenu(isSignedIn, noMenu);
        private _start(initializing, path);
        private _cleanUpOnSignOut(isSignedIn);
        private _hookWindowBeforeUnload(noHistory, isAttached);
        private _beforeUnload(e);
        private _registerKeybindings(registration);
        private _unregisterKeybindings(registration);
        private _keysPressed(e);
        static stripHashBang(path?: string): string;
    }
    class AppServiceHooks extends Vidyano.ServiceHooks {
        app: App;
        constructor(app: App);
        private _initializeGoogleAnalytics();
        trackEvent(action: string, option: string, owner: ServiceObjectWithActions): void;
        trackPageView(path: string): void;
        onConstructQuery(service: Service, query: any, parent?: Vidyano.PersistentObject, asLookup?: boolean, maxSelectedItems?: number): Vidyano.Query;
        onActionConfirmation(action: Action, option: number): Promise<boolean>;
        onAction(args: ExecuteActionArgs): Promise<any>;
        onOpen(obj: ServiceObject, replaceCurrent?: boolean, fromAction?: boolean): void;
        onClose(parent: Vidyano.ServiceObject): void;
        onMessageDialog(title: string, message: string, html: boolean, ...actions: string[]): Promise<number>;
        onSelectReference(query: Vidyano.Query): Promise<QueryResultItem[]>;
        onSessionExpired(): void;
        onNavigate(path: string, replaceCurrent?: boolean): void;
        onClientOperation(operation: ClientOperations.IClientOperation): void;
    }
}
declare namespace Vidyano.WebComponents {
    class AppRouteError extends WebComponent {
        private _setTitle;
        private _setMessage;
        private _activate(e);
    }
}
declare namespace Vidyano.WebComponents {
    class AppRoute extends WebComponent {
        route: string;
        component: string;
        private _constructor;
        private _constructorChanged;
        private _parameters;
        private _documentTitleBackup;
        active: boolean;
        path: string;
        deactivator: (result: boolean) => void;
        private _setActive;
        private _setPath;
        constructor(route: string, component: string);
        attached(): void;
        activate(parameters?: {
            [key: string]: string;
        }): void;
        deactivate(): Promise<boolean>;
        reset(): void;
        parameters: any;
        private _activeChanged();
        private _titleChanged(e, detail);
        private _componentChanged();
    }
}
declare namespace Vidyano.WebComponents {
    class AttachedNotifier extends WebComponent {
        private _wasAttached;
        oneTime: boolean;
        attached(): void;
    }
}
declare namespace Vidyano.WebComponents.Attributes {
    class PersistentObjectAttributeAsDetail extends WebComponents.Attributes.PersistentObjectAttribute {
        private _inlineAddHeight;
        private _lastComputedWidths;
        attribute: Vidyano.PersistentObjectAttributeAsDetail;
        newAction: Vidyano.Action;
        newActionPinned: boolean;
        private _setInitializing;
        private _setNewAction;
        private _setDeleteAction;
        private _isColumnVisible(column);
        private _computeColumns(columns);
        private _computeCanDelete(editing, deleteAction, objects);
        private _computeNewActionPinned(height, newAction);
        private _updateActions(actions, editing, readOnly);
        private _updateWidths(columns, width, deleteAction, editing, isAttached);
        private _rowAdded(e);
        private _add(e);
        private _delete(e);
    }
    class PersistentObjectAttributeAsDetailRow extends WebComponents.WebComponent {
        private _isColumnVisible(column);
        private _getDisplayValue(obj, column);
        private _getAttributeForColumn(obj, column);
        private _scrollNewDetailRowIntoView(serviceObject, columns, editing, isAttached);
    }
}
declare namespace Vidyano.WebComponents.Attributes {
    class PersistentObjectAttributeBinaryFile extends WebComponents.Attributes.PersistentObjectAttribute {
        private _inputContainer;
        private _inputAttribute;
        private _change(e);
        private _registerInput(attribute, isAttached);
        private _clear();
        private _computeCanClear(value, readOnly);
        private _computeFileName(value);
    }
}
declare namespace Vidyano.WebComponents.Attributes {
    class PersistentObjectAttributeBoolean extends WebComponents.Attributes.PersistentObjectAttribute {
        protected _valueChanged(newValue: any): void;
    }
    class PersistentObjectAttributeNullableBoolean extends WebComponents.Attributes.PersistentObjectAttribute {
        private _computeOptions(attribute);
        protected _valueChanged(newValue: any): void;
        private _notNull(value);
    }
}
declare namespace Vidyano.WebComponents.Attributes {
    class PersistentObjectAttributeComboBox extends WebComponents.Attributes.PersistentObjectAttribute {
        comboBoxOptions: string[];
        newValue: string;
        private _setComboBoxOptions;
        protected _editingChanged(): void;
        protected _valueChanged(newValue: any): void;
        protected _optionsChanged(): void;
        private _add();
        private _computeCanAdd(newValue, options);
    }
}
declare namespace Vidyano.WebComponents.Attributes {
    class PersistentObjectAttributeCommonMark extends PersistentObjectAttribute {
        private _setMarkedElementLoaded;
        constructor();
        private _editTextAreaBlur();
        private _computeNotEditing(markedElementLoaded, editing);
    }
}
declare namespace Vidyano.WebComponents.Attributes {
    class PersistentObjectAttributeDateTime extends WebComponents.Attributes.PersistentObjectAttribute {
        private _dateInput;
        private _timeInput;
        private _syncedSelectedDate;
        private _lastRenderedSelectedDate;
        private _isDateFilled;
        private _isTimeFilled;
        hasTimeComponent: boolean;
        hasInvalidTime: boolean;
        hasDateComponent: boolean;
        hasInvalidDate: boolean;
        selectedDate: Date;
        private _setHasInvalidTime;
        private _setHasInvalidDate;
        dateInput: HTMLInputElement;
        timeInput: HTMLInputElement;
        protected _editingChanged(): void;
        protected _valueChanged(newValue: any): void;
        private _selectedDateChanged();
        private _clear();
        private _renderSelectedDate(forceDate?, forceTime?);
        private _dateFilled(e, detail);
        private _timeChanged(e, detail);
        private _timeFilled(e, detail);
        private _updateSelectedDate(date, time?);
        private _computeHasComponent(target, component);
        private _computeDateFormat();
        private _computeDateSeparator();
        private _computeTimeFormat();
        private _computeTimeSeparator();
        private _computeCanClear(value, required);
    }
}
declare namespace Vidyano.WebComponents.Attributes {
    class PersistentObjectAttributeDropDown extends WebComponents.Attributes.PersistentObjectAttribute {
        protected _valueChanged(newValue: any): void;
    }
}
declare namespace Vidyano.WebComponents.Attributes {
    class PersistentObjectAttributeFlagsEnum extends WebComponents.Attributes.PersistentObjectAttribute {
    }
    class PersistentObjectAttributeFlagsEnumFlag extends WebComponents.WebComponent {
        private _skipCheckedChanged;
        attribute: Vidyano.PersistentObjectAttribute;
        checked: boolean;
        label: string;
        option: Vidyano.Common.IKeyValuePair;
        private _checkedChanged();
        private _computeLabel(option);
        private _valueChanged(value, label);
        private _values(value);
    }
}
declare namespace Vidyano.WebComponents.Attributes {
    class PersistentObjectAttributeImage extends WebComponents.Attributes.PersistentObjectAttribute {
        private _pasteListener;
        _attributeChanged(): void;
        detached(): void;
        private _change(e);
        private _clear();
        private _computeHasValue(value);
        private _computeImage(value);
        private _pasteAuto(e);
        private _pasteCreateImage(source);
        private _showDialog();
    }
    class PersistentObjectAttributeImageDialog extends WebComponents.Dialog {
        label: string;
        src: string;
        constructor(label: string, src: string);
        private _close();
    }
}
declare namespace Vidyano.WebComponents.Attributes {
    class PersistentObjectAttributeKeyValueList extends WebComponents.Attributes.PersistentObjectAttribute {
        protected _valueChanged(newValue: any): void;
    }
}
declare namespace Vidyano.WebComponents.Attributes {
    class PersistentObjectAttributeMultiLineString extends PersistentObjectAttribute {
        maxlength: number;
        protected _attributeChanged(): void;
        private _editTextAreaBlur();
    }
}
declare namespace Vidyano.WebComponents.Attributes {
    class PersistentObjectAttributeMultiStringItems extends Sortable {
        protected _dragEnd(): void;
    }
    class PersistentObjectAttributeMultiStringItem extends WebComponent {
        private _focusQueued;
        value: string;
        isNew: boolean;
        isReadOnly: boolean;
        constructor(value: string, isReadOnly?: boolean);
        attached(): void;
        queueFocus(): void;
        private _valueChanged(value);
        private _onInputBlur();
    }
    class PersistentObjectAttributeMultiString extends PersistentObjectAttribute {
        strings: PersistentObjectAttributeMultiStringItem[];
        private _setNewString;
        private _computeStrings(value, readOnly);
        private _itemValueNew(e, detail);
        private _itemsOrderChanged();
        private _itemValueChanged(e);
        private _getValues();
        private _render(strings, editing, isAttached);
    }
}
declare namespace Vidyano.WebComponents.Attributes {
    class PersistentObjectAttributeNumeric extends WebComponents.Attributes.PersistentObjectAttribute {
        private _allowDecimal;
        private _isNullable;
        private _decimalSeparator;
        private _dataType;
        private static _decimalTypes;
        private static _unsignedTypes;
        _attributeChanged(): void;
        protected _attributeValueChanged(): void;
        protected _valueChanged(newValue: any): void;
        private _editInputBlur(e);
        private _canParse(value);
        private _between(value, minValue, maxValue);
        private _setCarretIndex(input, carretIndex);
        private _keypress(e);
    }
}
declare namespace Vidyano.WebComponents.Attributes {
    class PersistentObjectAttributePassword extends WebComponents.Attributes.PersistentObjectAttribute {
        private _editInputBlur();
    }
}
declare namespace Vidyano.WebComponents.Attributes {
    class PersistentObjectAttributeReference extends WebComponents.Attributes.PersistentObjectAttribute {
        objectId: string;
        attribute: Vidyano.PersistentObjectAttributeWithReference;
        href: string;
        filter: string;
        private _setCanClear;
        private _setCanAddNewReference;
        private _setCanBrowseReference;
        attached(): void;
        protected _attributeChanged(): void;
        protected _valueChanged(newValue: any): void;
        private _objectIdChanged();
        private _filterBlur();
        protected _editingChanged(): void;
        private _browseReference(throwExceptions?);
        private _addNewReference(e);
        private _clearReference(e);
        private _update();
        private _open(e);
        private _computeTarget(attribute, href);
    }
}
declare namespace Vidyano.WebComponents.Attributes {
    class PersistentObjectAttributeString extends PersistentObjectAttribute {
        private _suggestionsSeparator;
        characterCasing: string;
        editInputStyle: string;
        inputtype: string;
        maxlength: number;
        suggestions: string[];
        private _setEditInputStyle;
        private _setSuggestions;
        protected _attributeChanged(): void;
        private _editInputBlur();
        protected _valueChanged(): void;
        private _addSuggestion(e);
        private _computeFilteredSuggestions(suggestions, value);
        private _computeHasSuggestions(suggestions, readOnly);
        private _characterCasingChanged(casing);
        private _changeCasing(val);
    }
}
declare namespace Vidyano.WebComponents.Attributes {
    interface ITranslatedString {
        key: string;
        label: string;
        value: string;
    }
    class PersistentObjectAttributeTranslatedString extends PersistentObjectAttribute {
        private _defaultLanguage;
        strings: ITranslatedString[];
        multiline: boolean;
        private _setStrings;
        protected _optionsChanged(): void;
        protected _valueChanged(newValue: string): void;
        private _editInputBlur();
        private _computeMultiline(attribute);
        private _computeCanShowDialog(strings);
        private _showLanguagesDialog();
    }
    class PersistentObjectAttributeTranslatedStringDialog extends Dialog {
        label: string;
        strings: ITranslatedString[];
        multiline: boolean;
        readonly: boolean;
        constructor(label: string, strings: ITranslatedString[], multiline: boolean, readonly: boolean);
        private _ok();
    }
}
declare namespace Vidyano.WebComponents.Attributes {
    class PersistentObjectAttributeUser extends WebComponents.Attributes.PersistentObjectAttribute {
        private _browseReference();
        private _clearReference();
        private _setNewUser(id, name);
        private _computeFriendlyName(options);
        private _computeCanClear(isRequired, value);
        private _computeCanBrowseReference(isReadOnly);
    }
}
declare namespace Vidyano.WebComponents.Attributes {
    class PersistentObjectAttributeEdit extends WebComponent {
        private _setFocus;
        attribute: Vidyano.PersistentObjectAttribute;
        private _focus(e);
        private _blur(e);
        private _showError();
        private _computeHasError(validationError);
    }
}
declare namespace Vidyano.WebComponents.Attributes {
    class PersistentObjectAttribute extends WebComponent {
        static typeSynonyms: {
            [key: string]: string[];
        };
        private _foreground;
        attribute: Vidyano.PersistentObjectAttribute;
        value: any;
        editing: boolean;
        nonEdit: boolean;
        readOnly: boolean;
        protected _attributeValueChanged(): void;
        protected _optionsChanged(): void;
        protected _attributeChanged(): void;
        protected _editingChanged(): void;
        protected _valueChanged(newValue: any): void;
        private _computeHasError(validationError);
        private _computeEditing(isEditing, nonEdit);
        private _updateForegroundDataTypeHint(attribute, isEditing, isReadOnly);
        static register(info?: IWebComponentRegistrationInfo): any;
    }
}
declare namespace Vidyano.WebComponents {
    class Button extends WebComponents.WebComponent {
        private _setCustomLayout;
        attached(): void;
    }
}
declare namespace Vidyano.WebComponents {
    abstract class Chart extends WebComponent {
        protected static colors: string[];
        chart: Vidyano.QueryChart;
    }
}
declare namespace Vidyano.WebComponents {
    class ChartSelector extends WebComponent {
        query: Vidyano.Query;
        private _computeTypes(charts);
        private _showGrid(e);
        private _showChart(e);
    }
}
declare namespace Vidyano.WebComponents {
    class Checkbox extends WebComponents.WebComponent {
        checked: boolean;
        label: string;
        disabled: boolean;
        toggle(): void;
        private _computeIsNull(checked);
    }
}
declare namespace Vidyano.WebComponents {
    class DatePicker extends WebComponent {
        private _today;
        private _daysBody;
        private _monthsAndYearsBody;
        private _dayCells;
        private _monthsAndYearsCells;
        private _currentDate;
        private _minYears;
        private _scopedClassName;
        header: string;
        zoom: string;
        selectedDate: Date;
        attached(): void;
        private _zoomChanged();
        private _selectedDateChanged();
        private _render(zoom?);
        private _getDayClass(day, month, year, baseClass?);
        private _forward(e);
        private _fastForward(e);
        private _backward(e);
        private _fastBackward(e);
        private _zoomOut(e);
        private _select(e);
        private _catchClick(e);
    }
}
declare namespace Vidyano.WebComponents {
    interface IDialogOptions {
    }
    class DialogInstance {
        options: IDialogOptions;
        result: Promise<any>;
        private _resolve;
        private _reject;
        constructor(options: IDialogOptions, result: Promise<any>, _resolve: Function, _reject: Function);
        resolve(result?: any): void;
        reject(error?: any): void;
    }
    abstract class Dialog extends WebComponent {
        private _instance;
        private _show(e, details);
        instance: DialogInstance;
        protected show(options: IDialogOptions): void;
        protected close(result?: any): void;
        protected cancel(result?: any): void;
        static register(info?: IWebComponentRegistrationInfo): any;
    }
    class DialogHost extends WebComponent {
        private _dialog;
        private _translate;
        shown: boolean;
        private _setShown;
        private _set_translate;
        constructor(_dialog: Dialog);
        private _translateChanged();
        private _track(e);
        show(options?: IDialogOptions): Promise<any>;
    }
}
declare namespace Vidyano.WebComponents {
    class Grid extends WebComponent {
    }
}
declare namespace Vidyano.WebComponents {
    class Icon extends Resource {
        constructor(source?: string);
        protected _contentTarget: Node;
        static LoadFragment(source: string): DocumentFragment;
        static Exists(name: string): boolean;
    }
}
declare namespace Vidyano.WebComponents {
    class InputSearch extends WebComponent {
        value: string;
        focused: boolean;
        private _searchKeypressed(e);
        private _searchClick(e?);
        private _input_focused();
        private _input_blurred();
        private _stop_tap(e);
        focus(): void;
    }
}
declare namespace Vidyano.WebComponents {
    class MaskedInput extends WebComponent {
        private _maskedInput;
        format: string;
        separator: string;
        readonly: boolean;
        private _initialize(format, separator, isAttached);
        private _readonlyChanged();
        resetField(): void;
        setAllowed(a: string): void;
        setFormat(f: string): void;
        setSeparator(s: string): void;
        setTypeon(t: string): void;
        setEnabled(val: boolean): void;
    }
}
declare namespace Vidyano.WebComponents {
    class Menu extends WebComponent {
        filter: string;
        filtering: boolean;
        activeProgramUnit: ProgramUnit;
        collapsed: boolean;
        hasGlobalSearch: boolean;
        attached(): void;
        detached(): void;
        private _filterChanged();
        private _search();
        private _computeHasGlobalSearch(isAttached);
        private _computeCollapsedWithGlobalSearch(collapsed, hasGlobalSearch);
        private _toggleCollapse();
        private _hasGroupItems(programUnitItems);
        private _countItems(programUnitItems);
        private _focusSearch();
        private _catchInputSearchTap(e);
    }
    class MenuItem extends WebComponent {
        item: Vidyano.ProgramUnitItem;
        programUnit: Vidyano.ProgramUnit;
        expand: boolean;
        filter: string;
        filtering: boolean;
        hide: boolean;
        filterParent: ProgramUnitItem;
        private _setExpand;
        private _tap(e);
        private _filterChanged();
        private _hasMatch(item, search);
        private _programUnitChanged();
        private _updateItemTitle(item, filter, filtering, collapsed);
        private _computedHasItems(item);
        private _computedHref(item);
        private _titleMouseenter();
    }
}
declare namespace Vidyano.WebComponents {
    interface IMessageDialogOptions extends Vidyano.WebComponents.IDialogOptions {
        noClose?: boolean;
        title?: string;
        titleIcon?: string;
        actions?: string[];
        actionTypes?: string[];
        message: string;
        extraClasses?: string[];
        html?: boolean;
    }
    class MessageDialog extends Dialog {
        options: IMessageDialogOptions;
        private _setOptions;
        protected show(options: IMessageDialogOptions): void;
        private _hasHeaderIcon(options);
        private _getActionType(options, index);
        private _onSelectAction(e);
        private _isFirst(index);
    }
}
declare namespace Vidyano.WebComponents {
    class Notification extends WebComponent {
        serviceObject: Vidyano.ServiceObjectWithActions;
        isOverflowing: boolean;
        type: string;
        text: string;
        private _setIsOverflowing;
        private _close();
        private _moreInfo(e);
        private _trackerSizeChanged(e);
        private _textChanged();
        private _setTextOverflow();
        private _computeText(notification);
        private _computeShown(text);
        private _getIconType(type);
        private _computeIcon(type);
    }
}
declare namespace Vidyano.WebComponents {
    class Overflow extends WebComponent {
        private _overflownChildren;
        private _visibibleSizeChangedSkip;
        hasOverflow: boolean;
        private _setHasOverflow;
        private _visibleSizeChanged(e, detail);
        protected _getChildren(): linqjs.Enumerable<HTMLElement>;
        private _popupOpening();
        private _popupClosed();
        private _popup(e);
    }
}
declare namespace Vidyano.WebComponents {
    class PersistentObject extends WebComponent {
        private _uniqueId;
        private _parameters;
        private _styleElement;
        private _cacheEntry;
        persistentObject: Vidyano.PersistentObject;
        layout: string;
        masterWidth: string;
        masterTabs: Vidyano.PersistentObjectTab[];
        selectedMasterTab: Vidyano.PersistentObjectTab;
        detailTabs: Vidyano.PersistentObjectTab[];
        selectedDetailTab: Vidyano.PersistentObjectTab;
        attached(): void;
        detached(): void;
        private _persistentObjectChanged(persistentObject, isAttached);
        private _masterWidthChanged();
        private _computeMasterTabs(persistentObject, tabs);
        private _computeDetailTabs(persistentObject, tabs);
        private _detailTabsChanged();
        private _masterTabsChanged();
        private _selectedMasterTabChanged();
        private _selectedDetailTabChanged();
        private _computeLayout(persistentObject, masterTabs?, detailTabs?);
        private _computeLayoutMasterDetail(persistentObject, masterTabs?, detailTabs?);
        private _computeLayoutDetailsOnly(persistentObject, masterTabs?, detailTabs?);
        private _computeLayoutFullPage(persistentObject, detailTabs?);
        private _computeLayoutMasterActions(persistentObject, masterTabs?);
        private _computeLayoutDetailActions(persistentObject, detailTabs?);
        private _computeLayoutMasterTabs(persistentObject, masterTabs?, detailTabs?);
        private _computeLayoutDetailTabs(persistentObject, detailTabs?);
        private _disableTabScrolling(tab);
        private _hasMasterTabs(tabs);
        private _hasDetailTabs(tabs);
        private _tabselect(e, detail);
        private _trackSplitter(e, detail);
    }
    class PersistentObjectDetailsContent extends WebComponent {
    }
    class PersistentObjectDetailsHeader extends WebComponent {
    }
}
declare namespace Vidyano.WebComponents {
    class PersistentObjectAttributePresenter extends WebComponent {
        private static _attributeImports;
        private _renderedAttribute;
        private _renderedAttributeElement;
        attribute: Vidyano.PersistentObjectAttribute;
        nonEdit: boolean;
        height: number;
        loading: boolean;
        private _setLoading;
        private _attributeChanged(attribute, isAttached);
        private _getAttributeTypeImportInfo(type);
        private _renderAttribute(attribute, attributeType);
        private _computeEditing(isEditing, nonEdit);
        private _nonEditChanged(nonEdit);
        private _computeRequired(attribute, required, value);
        private _loadingChanged(loading);
    }
}
declare namespace Vidyano.WebComponents {
    class PersistentObjectDialog extends Dialog {
        persistentObject: Vidyano.PersistentObject;
        private _forwardSave;
        private _saveHook;
        tab: Vidyano.PersistentObjectAttributeTab;
        constructor(persistentObject: Vidyano.PersistentObject, _forwardSave?: boolean);
        private _save();
        private _cancel();
        private _computeTab(persistentObject, isAttached);
        private _computeReadOnly(tab);
        private _onSelectAction(e);
    }
}
declare namespace Vidyano.WebComponents {
    class PersistentObjectGroup extends WebComponent {
        private _items;
        private _itemsChecksum;
        private _presentersLoading;
        private _layout;
        group: Vidyano.PersistentObjectAttributeGroup;
        columns: number;
        loading: boolean;
        private _setLoading;
        private _computeLabel(group, groupIndex, isAttached);
        private _arrange(attributes, columns, attached);
        private _itemFromAttribute(attribute);
        private _onAttributeLoading(e);
        private _onAttributeLoaded(e);
    }
}
declare namespace Vidyano.WebComponents {
    class PersistentObjectPresenter extends WebComponent {
        private static _persistentObjectComponentLoader;
        private _cacheEntry;
        persistentObjectId: string;
        persistentObjectObjectId: string;
        persistentObject: Vidyano.PersistentObject;
        templated: boolean;
        private _setLoading;
        private _setTemplated;
        private _setError;
        private _activate(e);
        private _deactivate(e);
        private _computePersistentObject(persistentObjectId, persistentObjectObjectId, isAttached);
        private _computeHasError(error);
        private _persistentObjectChanged(persistentObject, oldPersistentObject);
        private _renderPersistentObject(persistentObject);
        private _edit();
        private _save();
        private _cancelSave();
    }
}
declare namespace Vidyano.WebComponents {
    class PersistentObjectTab extends WebComponent {
        tab: Vidyano.PersistentObjectAttributeTab;
        private _computeColumns(size, defaultColumnCount);
    }
}
declare namespace Vidyano.WebComponents {
    class PersistentObjectTabBar extends WebComponent {
        private _observeDisposer;
        tabs: Vidyano.PersistentObjectTab[];
        selectedTab: Vidyano.PersistentObjectTab;
        private _hookObservers();
        private _tabSelected(e, detail);
        private isInline(mode);
        private isDropDown(mode);
        private _isVisible(tab);
    }
    class PersistentObjectTabBarItem extends WebComponent {
        tab: Vidyano.PersistentObjectTab;
        private _select();
        private _computeIsSelected(tab, selectedTab);
        private _computeHasBadge(badge);
    }
}
declare namespace Vidyano.WebComponents {
    class PersistentObjectTabPresenter extends WebComponent {
        private static _persistentObjectTabComponentLoader;
        private _renderedTab;
        private _tabAttributes;
        tab: Vidyano.PersistentObjectTab;
        templated: boolean;
        scroll: boolean;
        private _setLoading;
        private _setTemplated;
        private _renderTab(tab, isAttached);
        private _attributeLoaded(e, detail);
    }
}
declare namespace Vidyano.WebComponents {
    class PopupCore extends WebComponent {
        private static _isBuggyGetBoundingClientRect;
        private static _openPopups;
        private __Vidyano_WebComponents_PopupCore__Instance__;
        private _resolver;
        private _closeOnMoveoutTimer;
        private _currentTarget;
        private _currentContent;
        protected _currentOrientation: string;
        open: boolean;
        orientation: string;
        contentAlign: string;
        disabled: boolean;
        sticky: boolean;
        hover: boolean;
        boundingTarget: HTMLElement;
        closeDelay: number;
        protected _setOpen: (val: boolean) => void;
        private _setHover;
        popup(target: HTMLElement | WebComponent): Promise<any>;
        protected _open(target: HTMLElement | WebComponent, content?: HTMLElement): void;
        protected _getTargetRect(target: HTMLElement): {
            targetRect: ClientRect;
            transformedRect?: ClientRect;
        };
        close(): void;
        protected _findParentPopup(): Popup;
        private _catchContentClick(e?);
        protected _contentMouseEnter(e: MouseEvent): void;
        protected _contentMouseLeave(e: MouseEvent): void;
        private _hoverChanged(hover);
        static closeAll(parent?: HTMLElement | WebComponent): void;
        private static _isDescendant(parent, child);
    }
    class Popup extends PopupCore {
        private _tapHandler;
        private _enterHandler;
        private _leaveHandler;
        private _header;
        autoSizeContent: boolean;
        openOnHover: boolean;
        popup(): Promise<any>;
        protected _open(target: HTMLElement | WebComponent): void;
        private _hookTapAndHoverEvents();
        private _tap(e);
        private _onOpen(e);
        protected _contentMouseLeave(e: MouseEvent): void;
        private _toggleSizeChanged(e, detail);
    }
}
declare namespace Vidyano.WebComponents {
    class PopupMenu extends WebComponent {
        private _openContextEventListener;
        contextMenuOnly: boolean;
        shiftKey: boolean;
        ctrlKey: boolean;
        rightAlign: boolean;
        openOnHover: boolean;
        popup(): Promise<any>;
        private _popupOpening();
        private _hookContextMenu(isAttached, contextMenu);
        private _openContext(e);
        private _alignmentChanged();
        private _mouseenter();
        private _mousemove(e);
    }
    class PopupMenuItem extends WebComponent {
        label: string;
        icon: string;
        checked: boolean;
        split: boolean;
        private _splitTap(e);
    }
    class PopupMenuItemSeparator extends WebComponent {
    }
}
declare namespace Vidyano.WebComponents {
    interface IProfilerServiceRequest extends Vidyano.IServiceRequest {
        hasNPlusOne: boolean;
        parameters: {
            key: string;
            value: string;
        }[];
        flattenedEntries: IFlattenedServiceRequestProfilerEntry[];
    }
    interface IFlattenedServiceRequestProfilerEntry {
        entry: IServiceRequestProfilerEntry;
        level: number;
    }
    class Profiler extends WebComponent {
        private _boundMousehweel;
        lastRequest: IProfilerServiceRequest;
        selectedRequest: IProfilerServiceRequest;
        zoom: number;
        timelineSize: ISize;
        profiledRequests: IProfilerServiceRequest[];
        private _setLastRequest;
        private _setSelectedRequest;
        private _setHoveredEntry;
        private _setSelectedEntry;
        private _setZoom;
        attached(): void;
        detached(): void;
        private _computeSQL(request);
        private _computeSharpSQL(request);
        private _isSelected(request, selectedRequest);
        private _hasWarnings(request);
        private _hasNPlusOne(request, entries?);
        private _hasSelectedEntry(selectedEntry);
        private _hasLastRequest(request);
        private _onMousewheel(e);
        private _selectRequest(e);
        private _selectedRequestChanged();
        private _profiledRequestsChanged(profiledRequests?);
        private _renderRequestTimeline(request, size, zoom);
        private _flattenEntries(entries?, level?, flattenedEntries?);
        private _computeEntryClassName(e);
        private _formatRequestParameters(request);
        private _formatMs(ms);
        private _formatDate(date);
        private _selectedEntryChanged(entry);
        private _closeSelectedEntry();
        private _close(e);
    }
}
declare namespace Vidyano.WebComponents {
    class ProgramUnitPresenter extends WebComponent {
        programUnit: Vidyano.ProgramUnit;
        private _setProgramUnit;
        private _activate(e);
        private _programUnitChanged(programUnit, oldProgramUnit);
    }
}
declare namespace Vidyano.WebComponents {
    class Query extends WebComponent {
        private _cacheEntry;
        query: Vidyano.Query;
        attached(): void;
        private _queryChanged();
        private _computeNoActions(actions);
        private _computeSearchOnHeader(noActions, query);
    }
}
declare namespace Vidyano.WebComponents {
    class QueryGridCellTemplate extends Resource {
        static Load(source: string): PolymerTemplate;
        static Exists(name: string): boolean;
    }
    class QueryGridCellImage extends WebComponent {
        private _isHidden;
        private _image;
        private _valueChanged(value);
    }
    class QueryGridCellBoolean extends WebComponent {
        private _icon;
        private _textNode;
        private _valueChanged(value);
    }
}
declare namespace Vidyano.WebComponents {
    class QueryGridColumnFilterProxyBase extends Vidyano.WebComponents.WebComponent {
        private _label;
        private _labelTextNode;
        protected queryColumn: Vidyano.QueryColumn;
        column: QueryGridColumn;
        inversed: boolean;
        filtered: boolean;
        protected _update(): void;
        protected _getDistinctDisplayValue(value: string): string;
        protected label: string;
    }
    class QueryGridColumnFilterProxy extends Vidyano.WebComponents.QueryGridColumnFilterProxyBase {
        private _upgrade();
    }
    interface IQueryGridColumnFilterDistinct {
        type: string;
        value: string;
        displayValue: string;
    }
    class QueryGridColumnFilter extends Vidyano.WebComponents.QueryGridColumnFilterProxyBase {
        private static _selector;
        private _openOnAttach;
        private _distinctHeight;
        private _resizeStart;
        column: QueryGridColumn;
        searchText: string;
        label: string;
        distincts: IQueryGridColumnFilterDistinct[];
        private _setLoading;
        attached(): void;
        private _popupOpening(e);
        private _distinctClick(e);
        private _updateFilters();
        private _updateDistincts();
        private _renderDistincts();
        private _search();
        private _inverse(e);
        private _clear(e);
        private _onResize(e, detail);
        private _catchClick(e);
    }
}
declare namespace Vidyano.WebComponents {
    class QueryGridColumnFooter extends WebComponent {
        private _resizingRAF;
        private _column;
        private _columnObserver;
        private _labelTextNode;
        private _typeHints;
        private _renderedValue;
        column: QueryGridColumn;
        private _columnPropertyChanged(sender, args);
        private _updateTotal(total);
        protected _getTypeHint(name: string, defaultValue?: string): string;
    }
}
declare namespace Vidyano.WebComponents {
    class QueryGridColumnHeader extends WebComponent {
        private _resizingRAF;
        private _column;
        private _columnObserver;
        private _minimumColumnWidth;
        private _labelTextNode;
        private _filter;
        private _sorting;
        private _setSorting;
        private _setDisableSort;
        attached(): void;
        private _onUpgradeFilterProxy(e);
        column: QueryGridColumn;
        private _sort(e);
        private _columnPropertyChanged(sender, args);
        private _updateLabel(label);
        private _updateSortingIcon(direction);
        private _resizeTrack(e, detail);
    }
}
declare namespace Vidyano.WebComponents {
    class QueryGridConfigureDialog extends Dialog {
        grid: QueryGrid;
        private _settings;
        private _columnElements;
        private _set_columnElements;
        constructor(grid: QueryGrid, _settings: QueryGridUserSettings);
        private _distributeColumns(e?);
        private _updateColumns(target, columns);
        private _reorderColumns(e);
        private _save();
        private _reset();
    }
    class QueryGridConfigureDialogColumnList extends Sortable {
        protected _dragEnd(): void;
    }
    class QueryGridConfigureDialogColumn extends WebComponent {
        column: QueryGridColumn;
        offset: number;
        isPinned: boolean;
        isHidden: boolean;
        calculatedWidth: number;
        constructor(column: QueryGridColumn);
        private _togglePin();
        private _toggleVisible();
    }
}
declare namespace Vidyano.WebComponents {
    class QueryGridFilters extends Vidyano.WebComponents.WebComponent {
        private _dialog;
        private _preventColumnFilterChangedListener;
        query: Vidyano.Query;
        queryFilters: Vidyano.QueryFilters;
        currentFilter: Vidyano.QueryFilter;
        private _computeFilters(filters);
        private _computeHidden(filters);
        private _computeDisabled(filters, currentFilter);
        private _computeHasFilters(filters);
        private _computeCanReset(currentFilter);
        private _computeCanSave(currentFilter, canSaveAs);
        private _computeCurrentFilterSaveLabel(currentFilter);
        private _computeCanSaveAs(currentFilter);
        private _computeFilterEditLabel(filter);
        private _reset();
        private _load(e);
        private _saveAs();
        private _save();
        private _delete(e);
    }
}
declare namespace Vidyano.WebComponents {
    class QueryGridSelectAll extends WebComponent {
        query: Vidyano.Query;
        private _toggle();
    }
}
declare namespace Vidyano.WebComponents {
    interface IQueryGridItemTapEventArgs {
        item: Vidyano.QueryResultItem;
    }
    class QueryGrid extends WebComponent {
        private static tableCache;
        private static perf;
        private _tableData;
        private _tableHeader;
        private _tableFooter;
        private _tablesUpdating;
        private _tablesUpdatingTimestamp;
        private _virtualTableOffset;
        private _virtualTableOffsetCurrent;
        private _virtualTableStartIndex;
        private _verticalScrollOffset;
        private _horizontalScrollOffset;
        private _horizontalScrollOffsetCurrent;
        private _items;
        private _columns;
        private _hasPendingUpdates;
        private _itemOpening;
        private _lastSelectedItemIndex;
        private _minimumColumnWidth;
        private _remainderWidth;
        private _settings;
        private _columnMenuColumn;
        private _lastUpdated;
        canReorder: boolean;
        rowHeight: number;
        viewportSize: ISize;
        query: Vidyano.Query;
        asLookup: boolean;
        initializing: boolean;
        private _setInitializing;
        private _setViewportSize;
        private _setRowHeight;
        private _setColumnWidthsCalculated;
        attached(): void;
        detached(): void;
        isColumnInView(column: QueryGridColumn): boolean;
        private _style;
        private _actionMenu;
        private _columnMenu;
        private _initializingChanged();
        private _sizeChanged(e, detail);
        private _verticalScrollOffsetChanged(verticalScrollOffset);
        private _horizontalScrollOffsetChanged(horizontalScrollOffset);
        private _computeSettings(columns);
        private _computeColumns(columns);
        private _computeItems(items, viewportSize, verticalScrollOffset, rowHeight, lastUpdated);
        private _computeCanSelect(query, noSelection);
        private _computeCanSelectAll(canSelect, isAvailable);
        private _computeInlineActions(query, noInlineActions);
        private _computeHasTotalItem(totalItem, items, columnWidthsUpdated);
        private _updateTables(items, columns, canReorder, isAttached);
        private _updateVerticalSpacer(totalItems, rowHeight);
        private _updateTableHeadersAndFooters(columns);
        private _updateTableData(items, columns);
        private _updateTableDataPendingUpdatesRAF;
        private _updateTableDataPendingUpdates();
        private _updateColumnWidths();
        private _columnWidthsUpdated(e?, detail?);
        private _requestAnimationFrame(action);
        private _itemSelect(e, detail);
        private _itemActions(e, detail);
        private _contextmenuData(e);
        private _closeActions();
        private _contextmenuColumn(e);
        private _togglePin();
        private _configureColumns();
        private _preventScroll(e);
    }
    class QueryGridColumn implements IQueryGridUserSettingsColumnData {
        private _column;
        private _userSettingsColumnData;
        calculatedWidth: number;
        calculatedOffset: number;
        constructor(_column: Vidyano.QueryColumn, _userSettingsColumnData: IQueryGridUserSettingsColumnData);
        column: Vidyano.QueryColumn;
        query: Vidyano.Query;
        name: string;
        label: string;
        type: string;
        canSort: boolean;
        canFilter: boolean;
        canListDistincts: boolean;
        sortDirection: SortDirection;
        distincts: IQueryColumnDistincts;
        offset: number;
        isPinned: boolean;
        isHidden: boolean;
        width: string;
        reset(): void;
    }
    interface IQueryGridUserSettingsColumnData {
        offset?: number;
        isPinned?: boolean;
        isHidden?: boolean;
        width?: string;
    }
    class QueryGridUserSettings extends Vidyano.Common.Observable<QueryGridUserSettings> {
        private _query;
        private _columnsByName;
        private _columns;
        constructor(_query: Vidyano.Query, data?: {
            [key: string]: IQueryGridUserSettingsColumnData;
        });
        getColumn(name: string): QueryGridColumn;
        columns: QueryGridColumn[];
        save(refreshOnComplete?: boolean): Promise<any>;
        static Load(query: Vidyano.Query): QueryGridUserSettings;
    }
    abstract class QueryGridTable {
        grid: QueryGrid;
        private _host;
        private _section;
        rows: QueryGridTableRow[];
        constructor(is: string, grid: QueryGrid);
        update(rowCount: number, columnCount: number): Promise<any>;
        protected abstract _createSection(): HTMLTableSectionElement;
        protected abstract _addRow(index: number): QueryGridTableRow;
        host: HTMLTableElement;
        section: HTMLTableSectionElement;
    }
    class QueryGridTableHeader extends QueryGridTable {
        constructor(grid: QueryGrid);
        update(columnCount: number): Promise<any>;
        protected _addRow(index: number): QueryGridTableRow;
        protected _createSection(): HTMLTableSectionElement;
    }
    class QueryGridTableFooter extends QueryGridTable {
        constructor(grid: QueryGrid);
        update(columnCount: number): Promise<any>;
        protected _addRow(index: number): QueryGridTableRow;
        protected _createSection(): HTMLTableSectionElement;
    }
    class QueryGridTableData extends QueryGridTable {
        constructor(grid: QueryGrid);
        protected _addRow(): QueryGridTableRow;
        protected _createSection(): HTMLTableSectionElement;
    }
    class QueryGridTableDataBody extends Sortable {
        private _table;
        constructor(_table: QueryGridTableData);
        protected _dragEnd(element: HTMLElement, newIndex: number, oldIndex: number): void;
    }
    abstract class QueryGridTableRow {
        private _table;
        private _host;
        private _remainder;
        columns: QueryGridTableColumn[];
        constructor(is: string, _table: QueryGridTable);
        updateColumnCount(columnCount: number): Promise<any>;
        protected abstract _createColumn(): QueryGridTableColumn;
        table: QueryGridTable;
        host: HTMLTableRowElement;
    }
    class QueryGridTableHeaderRow extends QueryGridTableRow {
        private _index;
        constructor(table: QueryGridTableHeader, _index: number);
        setColumns(columns: QueryGridColumn[]): void;
        protected _createColumn(): QueryGridTableColumn;
    }
    class QueryGridTableFooterRow extends QueryGridTableRow {
        private _index;
        constructor(table: QueryGridTableFooter, _index: number);
        setColumns(columns: QueryGridColumn[]): void;
        protected _createColumn(): QueryGridTableColumn;
    }
    class QueryGridTableDataRow extends QueryGridTableRow {
        private _itemPropertyChangedListener;
        private _itemQueryPropertyChangedListener;
        private _selector;
        private _actions;
        private _item;
        private _columnCount;
        private _firstCellWithPendingUpdates;
        private _isSelected;
        private _noData;
        private _columnsInUse;
        private _extraClass;
        columns: QueryGridTableDataColumn[];
        constructor(table: QueryGridTableData);
        selector: QueryGridTableDataColumnSelector;
        actions: QueryGridTableDataColumnActions;
        noData: boolean;
        item: Vidyano.QueryResultItem;
        setItem(item: Vidyano.QueryResultItem, columns: QueryGridColumn[], lastPinnedIndex?: number): boolean;
        updatePendingCellUpdates(): boolean;
        private _tap(e);
        private _itemPropertyChanged(sender, args);
        private _itemQueryPropertyChanged(sender, args);
        private _updateIsSelected();
        protected _createColumn(): QueryGridTableColumn;
    }
    abstract class QueryGridTableColumn {
        cell: HTMLElement;
        private _isPinned;
        private _host;
        private _column;
        private _hasContent;
        private _isLastPinned;
        constructor(is: string, cell?: HTMLElement, _isPinned?: boolean);
        host: HTMLTableColElement;
        column: QueryGridColumn;
        isPinned: boolean;
        setColumn(column: QueryGridColumn, lastPinned?: boolean): void;
        hasContent: boolean;
        protected _setHasContent(hasContent: boolean): void;
        static columnSafeName(name: string): string;
    }
    class QueryGridTableHeaderColumn extends QueryGridTableColumn {
        constructor();
        setColumn(column: QueryGridColumn, isLastPinned: boolean): void;
    }
    class QueryGridTableFooterColumn extends QueryGridTableColumn {
        constructor();
        setColumn(column: QueryGridColumn, isLastPinned: boolean): void;
    }
    class QueryGridTableDataColumn extends QueryGridTableColumn {
        private _row;
        private _item;
        private _hasPendingUpdate;
        private _foreground;
        private _fontWeight;
        private _textAlign;
        private _extraClass;
        private _typeHints;
        private _textNode;
        private _textNodeValue;
        private _customCellTemplate;
        private _hasCustomCellTemplate;
        private _lastColumnType;
        constructor(_row: QueryGridTableDataRow);
        item: Vidyano.QueryResultItem;
        hasPendingUpdate: boolean;
        setItem(item: Vidyano.QueryResultItem, column: QueryGridColumn, isLastPinned: boolean): boolean;
        update(): boolean;
        private _render();
        protected _getTypeHint(name: string, defaultValue?: string): string;
    }
    class QueryGridTableColumnRemainder extends QueryGridTableColumn {
        constructor();
    }
    class QueryGridTableDataColumnSelector extends QueryGridTableColumn {
        private _row;
        private _item;
        constructor(_row: QueryGridTableDataRow);
        item: Vidyano.QueryResultItem;
        private _tap(e);
    }
    class QueryGridTableDataColumnActions extends QueryGridTableColumn {
        private _row;
        private _item;
        constructor(_row: QueryGridTableDataRow);
        item: Vidyano.QueryResultItem;
        private _tap(e);
    }
}
declare namespace Vidyano.WebComponents {
    class QueryItemsPresenter extends WebComponent {
        private static _queryGridComponentLoader;
        private static _chartComponentLoader;
        private _renderedQuery;
        query: Vidyano.Query;
        templated: boolean;
        private _setLoading;
        private _setTemplated;
        private _renderQuery(query, currentChart, isAttached);
        private _refresh();
        private _new();
        private _delete();
        private _bulkEdit();
    }
}
declare namespace Vidyano.WebComponents {
    class QueryPresenter extends WebComponent {
        private static _queryComponentLoader;
        private _customTemplate;
        private _cacheEntry;
        queryId: string;
        query: Vidyano.Query;
        private _setLoading;
        private _setError;
        attached(): void;
        private _activate(e);
        private _computeHasError(error);
        private _computeQuery(queryId, isAttached);
        private _queryChanged(query, oldQuery);
        private _renderQuery(query);
        private _updateTitle(title);
    }
}
declare namespace Vidyano.WebComponents {
    abstract class Resource extends WebComponent {
        private _loadedSource;
        name: string;
        source: string;
        model: any;
        hasResource: boolean;
        private _setHasResource;
        attached(): void;
        addAlias(...alias: string[]): void;
        private _nameChanged(name, oldName);
        protected _contentTarget: Node;
        private _load();
        static register(info?: IWebComponentRegistrationInfo): any;
        static LoadFragment(source: string | Resource, tagName: string): DocumentFragment;
        static LoadResource(source: string, tagName: string): Resource;
        static Exists(name: string, tagName: string): boolean;
    }
}
declare namespace Vidyano.WebComponents {
    class Scroller extends WebComponent {
        private static _minBarSize;
        private _setHovering;
        private _setScrolling;
        private _verticalScrollHeight;
        private _verticalScrollTop;
        private _verticalScrollSpace;
        private _horizontalScrollWidth;
        private _horizontalScrollLeft;
        private _horizontalScrollSpace;
        private _trackStart;
        outerWidth: number;
        outerHeight: number;
        innerWidth: number;
        innerHeight: number;
        horizontal: boolean;
        noHorizontal: boolean;
        vertical: boolean;
        noVertical: boolean;
        horizontalScrollOffset: number;
        verticalScrollOffset: number;
        forceScrollbars: boolean;
        private _setOuterWidth;
        private _setOuterHeight;
        private _setInnerWidth;
        private _setInnerHeight;
        private _setHorizontal;
        private _setVertical;
        private _setScrollTopShadow;
        private _setScrollBottomShadow;
        private _setHiddenScrollbars;
        scroller: HTMLElement;
        scrollToTop(): void;
        scrollToBottom(): void;
        private _outerSizeChanged(e, detail);
        private _innerSizeChanged(e, detail);
        private _updateVerticalScrollbar(outerHeight, innerHeight, verticalScrollOffset, noVertical);
        private _updateHorizontalScrollbar(outerWidth, innerWidth, horizontalScrollOffset, noHorizontal);
        private _trackVertical(e, detail);
        private _trackHorizontal(e, detail);
        private _trapEvent(e);
        private _scroll(e);
        private _updateScrollOffsets();
        private _verticalScrollOffsetChanged(newVerticalScrollOffset);
        private _horizontalScrollOffsetChanged(newHorizontalScrollOffset);
        private _mouseenter();
        private _mouseleave();
        private _verticalScrollbarParentTap(e);
        private _horizontalScrollbarParentTap(e);
    }
}
declare namespace Vidyano.WebComponents {
    class Select extends WebComponent {
        private items;
        private filteredItems;
        private selectedItem;
        private suggestion;
        private filtering;
        private _lastMatchedInputValue;
        private _inputValue;
        private _pendingSelectedOption;
        options: string[] | Common.IKeyValuePair[];
        selectedOption: string;
        private _setSuggestion;
        private _setSelectedItem;
        private _setFiltering;
        private popup;
        private _keydown(e);
        private _keyup(e);
        private _openPopup();
        private _popupOpened();
        private _popupClosed();
        private _scrollItemIntoView();
        private _computeItems(options);
        private _computeFilteredItems(items, inputValue, filtering, selectedOption);
        private _computeSuggestionFeedback(inputValue, suggestion, filtering);
        private _setSelectedOption(option, force?);
        private _selectedItemChanged();
        private _selectedOptionChanged();
        private _suggestionChanged();
        private _getItem(key, items?);
        private _select(e, detail);
        private _equals(item1, item2);
        private _isReadonlyInput(readonly, disableFiltering);
    }
    interface ISelectItem {
        displayValue: string;
        option: string | Common.IKeyValuePair;
    }
    class SelectOptionItem extends WebComponent {
        item: ISelectItem;
        private _onTap(e);
    }
}
declare namespace Vidyano.WebComponents {
    class SelectReferenceDialog extends Dialog {
        query: Vidyano.Query;
        canSelect: boolean;
        constructor(query: Vidyano.Query);
        private _selectedItemsChanged();
        private _invalidateCanSelect(selectedItems?);
        private _queryPropertyChanged(sender, detail);
        private _select();
        private _search(e, detail);
        private _selectReference(e);
    }
}
declare namespace Vidyano.WebComponents {
    class SessionPresenter extends WebComponent {
        private _customTemplate;
        private _computeApplication(isAttached);
        private _computeSession(session);
    }
}
declare namespace Vidyano.WebComponents {
    class SignIn extends WebComponent {
        error: string;
        image: string;
        private _activate(e);
        private _imageChanged();
    }
    class SignInProvider extends WebComponent {
        private _signInButton;
        private _signInButtonWidth;
        private _signingInMessage;
        name: string;
        userName: string;
        password: string;
        staySignedIn: boolean;
        isVidyano: boolean;
        expand: boolean;
        signingIn: boolean;
        signingInCounter: number;
        private _setExpand;
        private _setSigningIn;
        private _vidyanoSignInAttached();
        private _keydown(e);
        private _computeLabel();
        private _computeDescription();
        private _computeIsVidyano();
        private _tap();
        private _autoFocus();
        private _signIn();
        private _computeSigninButtonLabel(signingIn, signingInCounter);
    }
}
declare namespace Vidyano.WebComponents {
    class SignOut extends WebComponent {
        private _activate(e);
    }
}
declare namespace Vidyano.WebComponents {
    class SizeTracker extends WebComponent {
        private _resizeTimer;
        private _resizeTimerQueuedElements;
        private _resizeLast;
        private _resizeRAF;
        private _scrollListener;
        deferred: boolean;
        triggerZero: boolean;
        private _setSize;
        attached(): void;
        detached(): void;
        measure(): void;
        private _onScroll(e);
        private _triggerSizeChanged();
        private _resizeTimerMicroTask();
        private _resetTriggers(element);
    }
}
declare namespace Vidyano.WebComponents {
    abstract class Sortable extends WebComponent {
        private _sortable;
        group: string;
        filter: string;
        handle: string;
        draggableItems: string;
        enabled: boolean;
        private _setIsDragging;
        private _setIsGroupDragging;
        attached(): void;
        detached(): void;
        groupChanged(): void;
        filterChanged(): void;
        handleChanged(): void;
        draggableItemsChangted(): void;
        protected _dragStart(): void;
        protected _dragEnd(element: HTMLElement, newIndex: number, oldIndex: number): void;
        private _create();
        private _destroy();
        private _enabledChanged(enabled);
        static register(info?: IWebComponentRegistrationInfo): any;
    }
}
declare namespace Vidyano.WebComponents {
    class Spinner extends WebComponent {
    }
}
declare namespace Vidyano.WebComponents {
    class Style extends Vidyano.WebComponents.WebComponent {
        private _uniqueId;
        private _styleElement;
        private _styles;
        key: string;
        attached(): void;
        detached(): void;
        getStyle(name: string): string;
        setStyle(name: string, ...css: string[]): void;
    }
}
declare namespace Vidyano.WebComponents {
    class TimePicker extends WebComponent {
        hours: number;
        minutes: number;
        state: string;
        time: Date;
        private _setHours;
        private _setMinutes;
        attached(): void;
        private _timeChanged();
        private _tap(e, detail, sender);
        private _switch(e, detail);
        private _updateTime();
        private _catchClick(e);
        private _zeroPrefix(n);
    }
}
declare namespace Vidyano.WebComponents {
    class User extends WebComponent {
        private service;
        isSignedIn: boolean;
        collapsed: boolean;
        private _setService;
        private _setIsSignedIn;
        private _setCanFeedback;
        private _setCanUserSettings;
        private _setCanProfile;
        private _setUserName;
        attached(): void;
        signIn(): void;
        signOut(): void;
        feedback(): void;
        userSettings(): void;
        private _showProfiler();
        private _signedInChanged();
    }
}
declare namespace Vidyano.WebComponents {
    module Keyboard {
        enum KeyCodes {
            backspace = 8,
            tab = 9,
            enter = 13,
            shift = 16,
            control = 17,
            alt = 18,
            pause = 19,
            break = 19,
            capslock = 20,
            escape = 27,
            pageup = 33,
            pagedown = 34,
            end = 35,
            home = 36,
            leftarrow = 37,
            uparrow = 38,
            rightarrow = 39,
            downarrow = 40,
            comma = 44,
            subtract = 45,
            period = 46,
            zero = 48,
            one = 49,
            two = 50,
            three = 51,
            four = 52,
            five = 53,
            six = 54,
            seven = 55,
            eight = 56,
            nine = 57,
        }
        var KeyIdentifiers: {
            "0": string;
            "1": string;
            "2": string;
            "3": string;
            "4": string;
            "5": string;
            "6": string;
            "7": string;
            "8": string;
            "9": string;
            "tab": string;
            "esc": string;
            "space": string;
            "*": string;
            "a": string;
            "b": string;
            "c": string;
            "d": string;
            "e": string;
            "f": string;
            "g": string;
            "h": string;
            "i": string;
            "j": string;
            "k": string;
            "l": string;
            "m": string;
            "n": string;
            "o": string;
            "p": string;
            "q": string;
            "r": string;
            "s": string;
            "t": string;
            "u": string;
            "v": string;
            "w": string;
            "x": string;
            "y": string;
            "z": string;
            "del": string;
        };
        interface IEvent extends KeyboardEvent {
            keyIdentifier: string;
        }
        interface IKeysEvent extends CustomEvent {
            detail: {
                combo: string;
                key: string;
                shiftKey?: boolean;
                ctrlKey?: boolean;
                altKey?: boolean;
                metaKey?: boolean;
                event: string;
                keyboardEvent: IEvent;
            };
        }
        interface IKeybindingRegistration {
            keys: string[];
            element: HTMLElement;
            listener: (e: IKeysEvent) => void;
            nonExclusive: boolean;
            priority?: number;
            appRoute?: Vidyano.WebComponents.AppRoute;
        }
    }
    interface IPosition {
        x: number;
        y: number;
    }
    interface ISize {
        width: number;
        height: number;
    }
    var scrollbarWidth: () => number;
    interface IWebComponentKeybindingInfo {
        [keys: string]: {
            listener: string;
            nonExclusive?: boolean;
            priority?: number;
        } | string;
    }
    interface IWebComponentRegistrationInfo {
        properties?: PolymerProperties;
        hostAttributes?: {
            [name: string]: any;
        };
        listeners?: {
            [eventName: string]: string;
        };
        observers?: string[];
        extends?: string;
        keybindings?: IWebComponentKeybindingInfo;
        forwardObservers?: string[];
    }
    interface IObserveChainDisposer {
        (): void;
    }
    class PolymerBase extends HTMLElement {
        /**
         * $ contains all names of elements in the shady DOM with an id attribute.
         */
        $: {
            [id: string]: HTMLElement;
        };
        /**
         * Convenience method to run `querySelector` on this local DOM scope.
         */
        $$: (selector: string) => HTMLElement | WebComponents.WebComponent;
        /**
         * Shady DOM entry point.
         */
        root: HTMLElement | WebComponent;
        /**
         * Invokes a function asynchronously. The context of the callback
         * function is bound to 'this' automatically.
         * @method async
         * @param {Function|String} method
         * @param {any|Array} args
         * @param {number} timeout
         */
        async: {
            (method: string, args?: any, timeout?: number): number;
            (method: Function, args?: any, timeout?: number): number;
        };
        /**
         * Cancels the async function call.
         */
        cancelAsync: (handle: number) => void;
        fire: (type: string, detail: any, options?: {
            onNode?: Node;
            bubbles?: boolean;
            cancelable?: boolean;
        }) => CustomEvent;
        /**
         * Call debounce to collapse multiple requests for a named task into one invocation, which is made after the wait time has elapsed with no new request. If no wait time is given, the callback is called at microtask timing (guaranteed to be before paint).
         */
        debounce: (jobName: string, callback: Function, wait?: number) => void;
        /**
         * Cancels an active debouncer without calling the callback.
         */
        cancelDebouncer: (jobName: string) => void;
        /**
         * Calls the debounced callback immediately and cancels the debouncer.
         */
        flushDebouncer: (jobName: string) => void;
        /**
         * Returns true if the named debounce task is waiting to run.
         */
        isDebouncerActive: (jobName: string) => void;
        push: (path: string, ...items: any[]) => number;
        pop: (path: string) => any;
        unshift: (path: string, items: any[]) => number;
        shift: (path: string) => any;
        splice: (path: string, index: number, removeCount?: number, items?: any[]) => any[];
        /**
         * Dynamically imports an HTML document.
         */
        importHref: (href: string, onLoad?: (e: CustomEvent) => void, onFail?: (e: CustomEvent) => void) => void;
        /**
         * Takes a URL relative to the <dom-module> of an imported Polymer element, and returns a path relative to the current document.
         * This method can be used, for example, to refer to an asset delivered alongside an HTML import.
         */
        resolveUrl: (href: string) => string;
        /**
         * Sets a path's value and notifies Polymer for a change for that path.
         */
        set: (path: string, value: any, root?: WebComponent) => void;
        /**
         * Notifies Polymer for a change in the given path.
         */
        notifyPath: (path: string, value: any, fromAbove?: boolean) => void;
        /**
         *  Applies a CSS transform to the specified node, or host element if no node is specified.
         */
        transform: (transform: string, node?: Node | WebComponent) => void;
        /**
         * Transforms the specified node, or host element if no node is specified.
         */
        translate3d: (x: string, y: string, z: string, node?: Node | WebComponent) => void;
        /**
         * Toggles the named boolean class on the host element, adding the class if bool is truthy and removing it if bool is falsey.
         * If node is specified, sets the class on node instead of the host element.
         */
        toggleClass: (name: string, bool: boolean, node?: Node | WebComponent) => void;
        toggleAttribute: (name: string, bool: boolean, node?: Node | WebComponent) => void;
        /**
         * Key-value pairs for the custom styles on the element.
         */
        customStyle: {
            [key: string]: string;
        };
        /**
         * Returns the computed style value for the given property.
         */
        getComputedStyleValue: (property: string) => string;
        /**
         * Revaluates custom property values.
         */
        updateStyles: () => void;
        /**
         * Force immediate content distribution.
         */
        distributeContent: () => void;
        /**
         * Returns a list of effective child nodes for this element.
         */
        getEffectiveChildNodes: () => Node[];
        /**
         * Returns a list of effective child elements for this element.
         */
        getEffectiveChildren: () => HTMLElement[];
        /**
         * Returns the first effective child that matches selector.
         */
        queryEffectiveChildren: (selector: string) => HTMLElement;
        /**
         * Returns a list of effective children that match selector.
         */
        queryAllEffectiveChildren: (selector: string) => HTMLElement[];
    }
    abstract class WebComponent extends PolymerBase {
        private _appRequested;
        protected translations: any;
        className: string;
        classList: DOMTokenList;
        tagName: string;
        style: CSSStyleDeclaration;
        isAttached: boolean;
        app: Vidyano.WebComponents.App;
        protected _setApp: (app: Vidyano.WebComponents.App) => void;
        attached(): void;
        detached(): void;
        private _setIsAttached(attached);
        empty(parent?: Node, condition?: (e: Node) => boolean): void;
        findParent<T>(condition: (element: Node) => boolean): T;
        translateMessage(key: string, ...params: string[]): string;
        protected escapeHTML(val: string): string;
        protected _forwardObservable(source: Vidyano.Common.Observable<any> | Array<any>, path: string, pathPrefix: string, callback?: (path: string) => void): IObserveChainDisposer;
        private _forwardComputed(value);
        private _forwardNegate(value);
        static getName(fnc: Function): string;
        private static _register(obj, info?, prefix?, ns?);
        static register(obj: Function, info: IWebComponentRegistrationInfo, prefix?: string, ns?: any): Function;
        static register(info?: IWebComponentRegistrationInfo, prefix?: string): any;
    }
}
declare namespace Vidyano.WebComponents {
    class Website extends WebComponent {
        attached(): void;
    }
    class WebsiteAppServiceHooks extends AppServiceHooks {
        createData(data: any): void;
    }
    class WebsitePageModel {
        private _name;
        private _label;
        private _content;
        constructor(page: Vidyano.QueryResultItem);
        name: string;
        label: string;
        content: string;
    }
}
