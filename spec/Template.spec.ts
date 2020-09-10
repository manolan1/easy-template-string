
import Template from '../src/Template';

describe('template', () => {

    it('should be created with a simple template', () => {
        const template = new Template('temp');
        expect(template.template).toEqual('temp');
    });

    it('should pass a simple string unchanged', () => {
        const template1 = new Template('temp');
        expect(template1.interpolate({})).toEqual('temp');
        const template2 = new Template('');
        expect(template2.interpolate({})).toEqual('');
    });

    it('should make a simple substitution', () => {
        const template = new Template('${value}');
        expect(template.interpolate({ value: 'abc' })).toEqual('abc');
    });

    it('should interpolate a simple substitution at the start', () => {
        const template = new Template('x${value}');
        expect(template.interpolate({ value: 'abc' })).toEqual('xabc');
    });

    it('should interpolate a simple substitution in the middle', () => {
        const template = new Template('x${value}y');
        expect(template.interpolate({ value: 'abc' })).toEqual('xabcy');
    });

    it('should interpolate two substitutions in the middle', () => {
        const template = new Template('x${value}y${value}z');
        expect(template.interpolate({ value: 'abc' })).toEqual('xabcyabcz');
    });

    it('should pass through an escaped interpolation', () => {
        const template = new Template('x\\${value}y');
        expect(template.interpolate({ value: 'abc' })).toEqual('x${value}y');
    });

    it('should pass through an escaped interpolation at start', () => {
        const template = new Template('\\${value}y');
        expect(template.interpolate({ value: 'abc' })).toEqual('${value}y');
    });

    it('should interpolate two different substitutions in the middle', () => {
        const template = new Template('x${value1}y${value2}z');
        expect(template.interpolate({ value1: 'abc', value2: 'def' })).toEqual('xabcydefz');
    });

    it('should ignore missing interpolations', () => {
        const template = new Template('x${value1}y${value2}z');
        expect(template.interpolate({ value2: 'def' })).toEqual('xydefz');
    });

    it('should coerce objects to string, even if it isn\'t pretty', () => {
        const template = new Template('x${value1}y${value2}z');
        expect(template.interpolate({ value1: {}, value2: 'def' })).toEqual('x[object Object]ydefz');
    });

    it('can identify a Template', () => {
        expect(Template.isTemplate('x${value1}y${value2}z')).toBeTrue();
        expect(Template.isTemplate('\\${value}y')).toBeFalse();
        expect(Template.isTemplate('just a string $ {a}')).toBeFalse();
        expect(Template.isTemplate('another string ${a')).toBeFalse();
    });

});
