import React from 'react';
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import Header from '../../components/Header/Header';
import FooterSection from '../../components/Footer/footer';

const plans = [
  {
    title: "Monthly Plan",
    price: "₹169",
    subtitle: "per month",
    benefits: ["Tests", "Trainings", "Full Access"],
    trialText: "Get 15-day free trial (autopay)",
    cancelNote: "Cancellation: Cancel within 15 days or ₹169 will deduct from the account",
  },
  {
    title: "6 Months Plan",
    price: "₹999",
    subtitle: "6 Months + 1 Month",
    benefits: ["Tests", "Trainings", "Full Access"],
    trialText: "Get 15-day free trial (autopay)",
    cancelNote: "Cancellation: Cancel within 15 days or ₹999 will deduct from the account",
  },
  {
    title: "Yearly Plan",
    price: "₹1999",
    subtitle: "per Year",
    benefits: ["Tests", "Trainings", "Full Access"],
    trialText: "Get 15-day free trial (autopay)",
    cancelNote: "Cancellation: Cancel within 15 days or ₹1999 will deduct from the account",
  },
];

const subscription = () => {
  return (
    <>
    <Header />
    <Container className="py-5">
      <Row className="g-4">
        {plans.map((plan, idx) => (
          <Col key={idx} xs={12} md={4}>
            <Card className="h-100 shadow-sm text-center border-0">
              <Card.Body>
                <div className="mb-3">
                  <div
                    className="rounded-circle d-inline-flex align-items-center justify-content-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#f6b800",
                    }}
                  >
                    <span role="img" aria-label="plan-icon"> </span>
                  </div>
                </div>
                <Card.Title>{plan.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {plan.subtitle}
                </Card.Subtitle>
                <h3 className="fw-bold text-warning">{plan.price}</h3>
                <hr />
                <ul className="list-unstyled mb-3">
                  {plan.benefits.map((item, i) => (
                    <li key={i} className="mb-1">✔ {item}</li>
                  ))}
                </ul>
                <p className="text-primary small mb-1">{plan.trialText}</p>
                <p className="text-muted small">{plan.cancelNote}</p>
                <Button variant="outline-warning" className="mt-2 px-4">Get Started</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    <FooterSection />
    </>
  );
};

export default subscription;