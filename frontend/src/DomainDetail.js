import React from 'react';

export default function DomainDetail({ domain }) {
  return (
    <div>
      <h2>{domain.title}</h2>
      <p>{domain.description}</p>

      <section>
        <h3>Reflection Questions</h3>
        <ul>
          {domain.reflectionQuestions.map(q => (
            <li key={q.id}>{q.prompt}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Tasks</h3>
        <ul>
          {domain.tasks.map(t => (
            <li key={t.id}>{t.description}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Follow-Up Prompts</h3>
        <ul>
          {domain.followUpPrompts.map(f => (
            <li key={f.id}>{f.prompt}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
