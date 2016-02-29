using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web.Hosting;
using Vidyano.Core.Services;
using Vidyano.Service.Repository;

namespace Websites.Service
{
    public class ContactActions : PersistentObjectActions<WebsitesEntityModelContainer, object>
    {
        internal static void Secure()
        {
            var websitesJsonFile = Path.Combine(HostingEnvironment.MapPath("~/App_Data/"), "websites.json");
            JObject websitesConfig = JObject.Parse(File.ReadAllText(websitesJsonFile));

            var madeChanges = false;
            foreach (var website in websitesConfig["Websites"])
            {
                var websiteConfig = website.First;

                madeChanges = EncryptEmails(websiteConfig, "ContactFrom") || madeChanges;
                madeChanges = EncryptEmails(websiteConfig, "ContactTo") || madeChanges;
            }

            if (madeChanges)
                File.WriteAllText(websitesJsonFile, websitesConfig.ToString(Formatting.Indented));
        }

        internal static bool EncryptEmails(JToken config, string field)
        {
            var emails = (string)config[field];
            if (string.IsNullOrEmpty(emails))
                return false;

            var madeChanges = false;
            var passphrase = Manager.Current.GetSetting("ContactEmailPassphrase");

            var encryptedEmails = new List<string>();
            foreach (var email in emails.Split(new char[] { ';' }, StringSplitOptions.RemoveEmptyEntries))
            {
                if (!email.Contains("@"))
                {
                    encryptedEmails.Add(email);
                    continue;
                }

                encryptedEmails.Add(StringCipher.Encrypt(email, passphrase));
                madeChanges = true;
            }

            if (madeChanges)
                config[field] = string.Join(";", encryptedEmails);

            return madeChanges;
        }

        public override void OnLoad(PersistentObject obj, PersistentObject parent)
        {
        }

        public override void OnSave(PersistentObject obj)
        {
            var website = Manager.Current.Website;
            if (website == null || !CheckRules(obj))
                return;

            try
            {
                var websiteContactTo = website["ContactTo"];
                var websiteContactFrom = website["ContactFrom"];
                if (string.IsNullOrEmpty(websiteContactTo) || string.IsNullOrEmpty(websiteContactFrom) || !Manager.Current.Mail.SendEmail(StringCipher.Decrypt(websiteContactFrom, Manager.Current.GetSetting("ContactEmailPassphrase")), StringCipher.Decrypt(websiteContactTo, Manager.Current.GetSetting("ContactEmailPassphrase")), "A message has been sent from " + website.Name, "Message from: " + string.Format("{0} <{1}>", (string)obj["Name"], (string)obj["Email"]) + "\n\n" + (string)obj["Message"]))
                    obj.AddNotification("No website contact information defined. The message could not be delivered", NotificationType.Error);
                else
                    obj.AddNotification(website["ContactConfirmation"] ?? "Thank you for contacting us!", NotificationType.OK);
            }
            catch (Exception e)
            {
                ServiceLocator.GetService<IExceptionService>().Log(e);
                obj.AddNotification("No website contact information defined. The message could not be delivered", NotificationType.Error);
            }
        }

        #region http://stackoverflow.com/questions/10168240/encrypting-decrypting-a-string-in-c-sharp

        static class StringCipher
        {
            // This constant is used to determine the keysize of the encryption algorithm in bits.
            // We divide this by 8 within the code below to get the equivalent number of bytes.
            private const int Keysize = 256;

            // This constant determines the number of iterations for the password bytes generation function.
            private const int DerivationIterations = 1000;

            public static string Encrypt(string plainText, string passPhrase)
            {
                // Salt and IV is randomly generated each time, but is preprended to encrypted cipher text
                // so that the same Salt and IV values can be used when decrypting.  
                var saltStringBytes = Generate256BitsOfRandomEntropy();
                var ivStringBytes = Generate256BitsOfRandomEntropy();
                var plainTextBytes = Encoding.UTF8.GetBytes(plainText);
                using (var password = new Rfc2898DeriveBytes(passPhrase, saltStringBytes, DerivationIterations))
                {
                    var keyBytes = password.GetBytes(Keysize / 8);
                    using (var symmetricKey = new RijndaelManaged())
                    {
                        symmetricKey.BlockSize = 256;
                        symmetricKey.Mode = CipherMode.CBC;
                        symmetricKey.Padding = PaddingMode.PKCS7;
                        using (var encryptor = symmetricKey.CreateEncryptor(keyBytes, ivStringBytes))
                        {
                            using (var memoryStream = new MemoryStream())
                            {
                                using (var cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
                                {
                                    cryptoStream.Write(plainTextBytes, 0, plainTextBytes.Length);
                                    cryptoStream.FlushFinalBlock();
                                    // Create the final bytes as a concatenation of the random salt bytes, the random iv bytes and the cipher bytes.
                                    var cipherTextBytes = saltStringBytes;
                                    cipherTextBytes = cipherTextBytes.Concat(ivStringBytes).ToArray();
                                    cipherTextBytes = cipherTextBytes.Concat(memoryStream.ToArray()).ToArray();
                                    memoryStream.Close();
                                    cryptoStream.Close();
                                    return Convert.ToBase64String(cipherTextBytes);
                                }
                            }
                        }
                    }
                }
            }

            public static string Decrypt(string cipherText, string passPhrase)
            {
                // Get the complete stream of bytes that represent:
                // [32 bytes of Salt] + [32 bytes of IV] + [n bytes of CipherText]
                var cipherTextBytesWithSaltAndIv = Convert.FromBase64String(cipherText);
                // Get the saltbytes by extracting the first 32 bytes from the supplied cipherText bytes.
                var saltStringBytes = cipherTextBytesWithSaltAndIv.Take(Keysize / 8).ToArray();
                // Get the IV bytes by extracting the next 32 bytes from the supplied cipherText bytes.
                var ivStringBytes = cipherTextBytesWithSaltAndIv.Skip(Keysize / 8).Take(Keysize / 8).ToArray();
                // Get the actual cipher text bytes by removing the first 64 bytes from the cipherText string.
                var cipherTextBytes = cipherTextBytesWithSaltAndIv.Skip((Keysize / 8) * 2).Take(cipherTextBytesWithSaltAndIv.Length - ((Keysize / 8) * 2)).ToArray();

                using (var password = new Rfc2898DeriveBytes(passPhrase, saltStringBytes, DerivationIterations))
                {
                    var keyBytes = password.GetBytes(Keysize / 8);
                    using (var symmetricKey = new RijndaelManaged())
                    {
                        symmetricKey.BlockSize = 256;
                        symmetricKey.Mode = CipherMode.CBC;
                        symmetricKey.Padding = PaddingMode.PKCS7;
                        using (var decryptor = symmetricKey.CreateDecryptor(keyBytes, ivStringBytes))
                        {
                            using (var memoryStream = new MemoryStream(cipherTextBytes))
                            {
                                using (var cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read))
                                {
                                    var plainTextBytes = new byte[cipherTextBytes.Length];
                                    var decryptedByteCount = cryptoStream.Read(plainTextBytes, 0, plainTextBytes.Length);
                                    memoryStream.Close();
                                    cryptoStream.Close();
                                    return Encoding.UTF8.GetString(plainTextBytes, 0, decryptedByteCount);
                                }
                            }
                        }
                    }
                }
            }

            private static byte[] Generate256BitsOfRandomEntropy()
            {
                var randomBytes = new byte[32]; // 32 Bytes will give us 256 bits.
                using (var rngCsp = new RNGCryptoServiceProvider())
                {
                    // Fill the array with cryptographically secure random bytes.
                    rngCsp.GetBytes(randomBytes);
                }
                return randomBytes;
            }
        }

        #endregion
    }
}