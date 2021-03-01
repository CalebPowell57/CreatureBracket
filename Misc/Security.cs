using System;
using System.Security.Cryptography;

namespace CreatureBracket.Misc
{
    public class Security
    {
        private const int SaltLength = 16;
        private const int HashLength = 20;
        private const int Iterations = 10000;

        public static string Hash(string input)
        {
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[SaltLength]);

            var pbkdf2 = new Rfc2898DeriveBytes(input, salt, Iterations);

            byte[] hash = pbkdf2.GetBytes(HashLength);

            byte[] hashBytes = new byte[HashLength + SaltLength];

            Array.Copy(salt, 0, hashBytes, 0, SaltLength);
            Array.Copy(hash, 0, hashBytes, SaltLength, HashLength);

            return Convert.ToBase64String(hashBytes);
        }

        public static bool Validate(string savedHash, string input)
        {
            //extract bytes
            byte[] hashBytes = Convert.FromBase64String(savedHash);

            //get salt
            byte[] salt = new byte[SaltLength];

            Array.Copy(hashBytes, 0, salt, 0, 16);

            //Compute the hash on input value
            var pbkdf2 = new Rfc2898DeriveBytes(input, salt, Iterations);
            byte[] hash = pbkdf2.GetBytes(HashLength);

            //compare results
            for (int i = 0; i < HashLength; i++)
            {
                if (hashBytes[i + SaltLength] != hash[i])
                {
                    return false;
                }
            }

            return true;
        }
    }
}
