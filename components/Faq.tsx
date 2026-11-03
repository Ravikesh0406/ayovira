"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { FAQ_ITEMS } from "@/lib/faq";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section" id="faq">
      <div className="container faq-grid">
        <div>
          <h2>Questions, answered</h2>
          <div className="faq-contact">
            <p>Still wondering something? Write to us.</p>
            <p>
              <a href="mailto:theayovira@gmail.com">theayovira@gmail.com</a>
            </p>
            <p>
              <a href="tel:+918582048456">8582048456</a>
            </p>
            <p>Faridabad, Haryana, India</p>
          </div>
        </div>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-question-${index}`;
            const answerId = `faq-answer-${index}`;
            return (
              <div className="faq-item" key={item.question} data-open={isOpen}>
                <h3 style={{ margin: 0 }}>
                  <button
                    type="button"
                    className="faq-question"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    {item.question}
                    <Plus size={20} aria-hidden="true" />
                  </button>
                </h3>
                <div
                  className="faq-answer"
                  id={answerId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
