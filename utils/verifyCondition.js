import Property from '../src/property.js';
import { checkCondition } from '../src/functions/condition.js';
import { events } from '../src/data/events.js';
import { talents } from '../src/data/talents.js';
import { achievements } from '../src/data/achievements.js';
import { age } from '../src/data/age.js';

// polyfill
globalThis.localStorage = {
  getItem: () => null,
};

// 检验配置的条件的正确性
function verify(prop, data) {
  const conditions = [];
  for(const d of Object.values(data)) {
    if(d.include) {
      conditions.push(d.include);
    }
    if(d.exclude) {
      conditions.push(d.exclude);
    }
    if(d.condition) {
      conditions.push(d.condition);
    }
    if(d.branch) {
      conditions.push(...d.branch.map((b) => b.split(':')[0]));
    }
  }
  for(let i = 0; i < conditions.length; i++) {
    const cond = conditions[i];
    checkCondition(prop, cond, true);
  }
  console.log('done', conditions.length);
}

const prop = new Property();
prop.initial({age});

verify(prop, events);
verify(prop, talents);
verify(prop, achievements);