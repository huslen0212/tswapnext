import { parse } from 'cookie';

export default function handler(req, res) {
  const cookies = parse(req.headers.cookie || '');
  const email = cookies.userEmail;

  if (email) {
    return res.status(200).json({ email });
  } else {
    return res.status(200).json({ email: null });
  }
}
