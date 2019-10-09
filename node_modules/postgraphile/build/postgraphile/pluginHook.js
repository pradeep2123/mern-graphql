"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = require("../../package.json");
const graphql = require("graphql");
const identityHook = (input) => input;
const identityPluginHook = (_hookName, input, _options) => input;
function contextIsSame(context1, context2) {
    // Shortcut if obvious
    if (context1 === context2) {
        return true;
    }
    // Blacklist approach from now on
    const keys1 = Object.keys(context1);
    const keys2 = Object.keys(context2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    // tslint:disable-next-line one-variable-per-declaration
    for (let i = 0, l = keys1.length; i < l; i++) {
        const key = keys1[i];
        if (context1[key] !== context2[key]) {
            return false;
        }
        if (keys2.indexOf(key) === -1) {
            return false;
        }
    }
    return true;
}
// Caches the last value of the hook, in case it's called with exactly the same
// arguments again.
function memoizeHook(hook) {
    let lastCall = null;
    return (argument, context) => {
        if (lastCall && lastCall.argument === argument && contextIsSame(lastCall.context, context)) {
            return lastCall.result;
        }
        else {
            const result = hook(argument, context);
            lastCall = {
                argument,
                context,
                result,
            };
            return result;
        }
    };
}
function shouldMemoizeHook(hookName) {
    return hookName === 'withPostGraphileContext';
}
function makeHook(plugins, hookName) {
    const combinedHook = plugins.reduce((previousHook, plugin) => {
        if (typeof plugin[hookName] === 'function') {
            return (argument, context) => {
                return plugin[hookName](previousHook(argument, context), context);
            };
        }
        else {
            return previousHook;
        }
    }, identityHook);
    if (combinedHook === identityHook) {
        return identityHook;
    }
    else if (shouldMemoizeHook(hookName)) {
        return memoizeHook(combinedHook);
    }
    else {
        return combinedHook;
    }
}
function makePluginHook(plugins) {
    const hooks = {};
    const emptyObject = {}; // caching this makes memoization faster when no context is needed
    function rawPluginHook(hookName, argument, context = emptyObject) {
        if (!hooks[hookName]) {
            hooks[hookName] = makeHook(plugins, hookName);
        }
        return hooks[hookName](argument, context);
    }
    const pluginHook = rawPluginHook('pluginHook', rawPluginHook, {});
    // Use this hook to check your hook is compatible with this version of
    // PostGraphile, also to get a reference to shared graphql instance.
    pluginHook('init', null, { version: package_json_1.version, graphql });
    return pluginHook;
}
exports.makePluginHook = makePluginHook;
function pluginHookFromOptions(options) {
    if (typeof options.pluginHook === 'function') {
        return options.pluginHook;
    }
    else {
        return identityPluginHook;
    }
}
exports.pluginHookFromOptions = pluginHookFromOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luSG9vay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wb3N0Z3JhcGhpbGUvcGx1Z2luSG9vay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLHFEQUE2QztBQUM3QyxtQ0FBbUM7QUF5RG5DLE1BQU0sWUFBWSxHQUFHLENBQUksS0FBUSxFQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUM7QUFDL0MsTUFBTSxrQkFBa0IsR0FBaUIsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDO0FBRS9FLFNBQVMsYUFBYSxDQUFDLFFBQVksRUFBRSxRQUFZO0lBQy9DLHNCQUFzQjtJQUN0QixJQUFJLFFBQVEsS0FBSyxRQUFRLEVBQUU7UUFDekIsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELGlDQUFpQztJQUNqQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxNQUFNLEVBQUU7UUFDakMsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUNELHdEQUF3RDtJQUN4RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzVDLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbkMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFB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