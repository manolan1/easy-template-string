
/*
 * Allow regular strings to support interpolation like JavaScript template strings
 *
 * ESLint rules against non-null assertion are disabled in a couple of places. This is 
 * because the Typescript representation of RegExpMatchArray does not take into account
 * the fact that we absolutely know the index (always) and group (based on the RegExp)
 * properties must exist when there is a match. This is exactly the situation that 
 * non-null assertions were designed to deal with!
 */

export default class Template {

    constructor(readonly template: string) { }

    interpolate(map: Record<string, unknown>): string {
        let result = '';
        let lastPos = 0;
        const matches = this.template.matchAll(Template.pattern);

        for (const match of matches) {
            /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
            const { beforeChar, fullPattern, propertyName } = match.groups!;

            if (beforeChar == '\\') {
                result += this.template.slice(lastPos, match.index) + fullPattern;
            } else {
                result += this.template.slice(lastPos, match.index) + beforeChar + (map[propertyName] ?? '');
            }
            /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
            lastPos = match[0].length + match.index!;
        }

        result += this.template.slice(lastPos);

        return result;
    }

    static pattern = /(?<beforeChar>^|.|\r|\n)(?<fullPattern>\$\{(?<propertyName>.*?)\})/g;

    static isTemplate(possibleTemplate: string): boolean {
        const matches = possibleTemplate.matchAll(Template.pattern);

        for (const match of matches) {
            /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
            if (match!.groups!.beforeChar !== '\\') {
                return true;
            }
        }
        return false;
    }
}
