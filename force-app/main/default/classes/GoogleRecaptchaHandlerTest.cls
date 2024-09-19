@isTest
public with sharing class GoogleRecaptchaHandlerTest {
    @IsTest 
    public static void testIsVerified() {
        Test.setMock(HttpCalloutMock.class, new GoogleRecaptchaHandlerTest.RecaptchaHttpCalloutMock());

        System.assert(GoogleRecaptchaHandler.isVerified('8djkfhsdfjsd49234734', '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe'));
    }

    @IsTest 
    public static void testFetchBaseURL() {
        List<String> myURLs = GoogleRecaptchaHandler.fetchBaseURL();

        System.assertEquals(4, myURLs.size());
        System.assert(myURLs.contains(URL.getOrgDomainUrl().toExternalForm()));
    }

    public class RecaptchaHttpCalloutMock implements HttpCalloutMock {
        // Implement this interface method
            public HTTPResponse respond(HTTPRequest request) {
                
                //First create a fake response
                HttpResponse response = new HttpResponse();
                
                response.setHeader('Content-Type', 'application/json');
                response.setBody('{"success":true, "challenge_ts": "2020-07-06T11:14:25Z", "hostname": "example.com"}');
                response.setStatusCode(200);
                
                return response;
            }
        }
}