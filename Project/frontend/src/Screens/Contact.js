import { useAuth0 } from "@auth0/auth0-react";
import styled, { keyframes } from "styled-components";

const Contact = () => {
  const { isAuthenticated, user } = useAuth0();

  // Define the pop-in animation
  const popIn = keyframes`
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  `;

  const Wrapper = styled.section`
    padding: 8rem 0;
    text-align: center;
    background-color: #f8f9fa;

    .container {
      margin-top: 4rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      .contact-form {
        max-width: 600px;
        width: 100%;
        background: #ffffff;
        padding: 3rem 2rem;
        border-radius: 10px;
        box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
        border: 1px solid #ddd;
        
        // Apply the pop-in animation
        animation: ${popIn} 0.6s ease forwards;

        h2 {
          color: #ff7f50;
          margin-bottom: 2rem;
          font-size: 1.8rem;
        }

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;

          input[type="text"],
          input[type="email"],
          textarea {
            width: 100%;
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 1rem;
            transition: all 0.3s ease;
            background-color: #f9f9f9;
          }

          input[type="text"]:focus,
          input[type="email"]:focus,
          textarea:focus {
            border-color: #ffc107;
            outline: none;
            background-color: #ffffff;
            box-shadow: 0px 4px 8px rgba(255, 193, 7, 0.3);
          }

          textarea {
            resize: none;
            height: 120px;
          }

          input[type="submit"] {
            padding: 1rem;
            border: none;
            border-radius: 5px;
            background-color: #ff7f50;
            color: white;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
              background-color: #ffc107;
              color: #333;
              transform: scale(0.98);
            }
          }
        }
      }
    }
  `;

  return (
    <Wrapper>
      <div className="container">
        <div className="contact-form">
          <h2>Contact Us</h2>
          <form
            action="https://formspree.io/f/xldenpyw"
            method="POST"
            className="contact-inputs"
          >
            <input
              type="text"
              placeholder="Username"
              name="username"
              required
              autoComplete="off"
            />
            <input
              type="email"
              name="Email"
              placeholder="Email"
              autoComplete="off"
              required
            />
            <textarea
              name="Message"
              cols="30"
              rows="6"
              required
              autoComplete="off"
              placeholder="Enter your message"
            ></textarea>
            <input type="submit" value="Send Message" />
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;
