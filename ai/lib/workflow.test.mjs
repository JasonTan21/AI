import assert from 'node:assert/strict';
import {fresh,transition,activeIndex,sample,steps,missing} from './workflow.mjs';
let s=fresh();
assert.equal(steps.length,9);
assert.throws(()=>transition(s,2,'save','Engineer',sample(2)),/previous/);
assert.throws(()=>transition(s,0,'submit','Engineer'),/Missing/);
s=transition(s,0,'save','Engineer',sample(0));
assert.equal(missing(s.records[0]).length,0);
assert.throws(()=>transition(s,0,'approve','Reviewer',{attested:true}),/submitted/);
s=transition(s,0,'submit','Engineer');
assert.throws(()=>transition(s,0,'approve','Engineer',{attested:true}),/reviewer/);
assert.throws(()=>transition(s,0,'approve','Reviewer'),/confirm/);
s=transition(s,0,'reject','Reviewer',{reason:'Project handover needs review'});
assert.equal(s.records[0].status,'draft');
for(let i=0;i<steps.length;i++){
 s=transition(s,i,'save','Engineer',sample(i));
 s=transition(s,i,'submit','Engineer');
 s=transition(s,i,'approve','Reviewer',{attested:true});
 assert.equal(activeIndex(s),i+1);
}
assert.equal(activeIndex(s),steps.length);
assert.throws(()=>transition(s,0,'save','Engineer',{notes:'changed'}),/Reopen/);
s=transition(s,3,'reopen','Reviewer');
assert.equal(activeIndex(s),3);
assert.ok(s.records.slice(0,3).every(r=>r.status==='approved'));
assert.ok(s.records.slice(3).every(r=>r.status==='draft'&&r.approval===null));
assert.throws(()=>transition(s,7,'submit','Engineer'),/previous/);
console.log('PASS: empty evidence, skip prevention, human review, rejection, all nine transitions, reopening and downstream invalidation.');
