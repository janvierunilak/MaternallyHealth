package com.DU.api.controller;

import io.swagger.v3.oas.annotations.responses.ApiResponse;

import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import com.DU.api.constants.Constants;
import com.DU.api.exception.AuthException;
import com.DU.api.exception.ResourceNotFoundException;
import com.DU.api.repository.UserRepository;
import com.DU.api.model.User;
import com.DU.api.service.LogsService;
import com.DU.api.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/api/v1/User")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	UserService userService;
	@Autowired
	LogsService logsService;

	@Operation(summary = "This is to fetch all users from the  Database", security = @SecurityRequirement(name = "bearerAuth"))
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "fetch  all users from database", content = {
					@Content(mediaType = "application/json") }),
			@ApiResponse(responseCode = "404", description = "NOt Available", content = @Content),
			@ApiResponse(responseCode = "403", description = "Forbidden, Authorization token must be provided", content = @Content) })
	@SecurityRequirement(name = "bearerAuth")
	// @Hidden
	@GetMapping("/")
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	User user;

	@Operation(summary = "This is to  login to system")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "login to the system", content = {
					@Content(mediaType = "application/json") }),
			@ApiResponse(responseCode = "404", description = "NOt Available", content = @Content),
			@ApiResponse(responseCode = "403", description = "Forbidden, Authorization token must be provided", content = @Content) })

	@PostMapping("/login")
	public ResponseEntity<Object> login(@RequestBody Map<String, Object> UserMap)
			throws javax.security.auth.message.AuthException {
		String email = (String) UserMap.get("email");
		String password = (String) UserMap.get("password");
		user = userService.validateUser(email, password);
		Map<String, Object> data = new HashMap<String, Object>();

		// data.put("User", user);
		// System.out.print(user);
		data.putAll(generateJWTToken(user));
		// String tok = token;
		String activity = "login";
		logsService.savelogs(user, activity);
		userRepository.setStatusForUser(1, user.getEmail());
		// userService.UpdateUser(user);
		// System.out.println("my data are :" + data);
		// System.out.println("my token is :" + tok);
		return new ResponseEntity<>(data, HttpStatus.OK);
	}

	@Operation(summary = "This is to  logou from the system", security = @SecurityRequirement(name = "bearerAuth"))
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "logout from the system", content = {
					@Content(mediaType = "application/json") }),
			@ApiResponse(responseCode = "404", description = "NOt Available", content = @Content),
			@ApiResponse(responseCode = "403", description = "Forbidden, Authorization token must be provided", content = @Content) })
	@SecurityRequirement(name = "bearerAuth")
	@PostMapping("/logout")

	public String logout(HttpServletRequest request)
			throws javax.security.auth.message.AuthException {
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("User", user);
		// System.out.print(user);
		// data.putAll(generateJWTToken(user));
		String useremail = request.getAttribute("email").toString();
		Integer stat = userRepository.findstatusbyemail(useremail);
		if (stat == 1) {

			// String tok = token;
			// logsService.logout(user);
			String activity = "logout";
			logsService.savelog(useremail, activity);
			User userr = userRepository.findByEmailAddress(useremail);
			userRepository.setStatusForUser(0, userr.getEmail());
			// userService.UpdateUser(user);
			// System.out.println("my data are :" + data);
			// System.out.println("my token is :" + tok);
			data.put("User", userr);
			// System.out.print(user);
			data.putAll(generateJWTToken(userr));
			return "Hello  " + userr.getFirstName() + " You Logged out successfully";
		} else {
			return "No user logged in";
		}
		// new ResponseEntity<>(data, HttpStatus.OK);
	}

	@Operation(summary = "This is to  signup  to  the system for new users")
	// @io.swagger.v3.oas.annotations.parameters.RequestBody(required = true)
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "This is to  signup  to  the system for new users", content = {
					@Content(mediaType = "application/json") }),
			@ApiResponse(responseCode = "404", description = "NOt Available", content = @Content),
			@ApiResponse(responseCode = "403", description = "Forbidden, Authorization token must be provided", content = @Content) })
	// @SecurityRequirement(name = "bearerAuth")

	@PostMapping("/signup")
	public ResponseEntity<Object> signup(@RequestBody User User)
			throws javax.security.auth.message.AuthException {
				User.setRole("NOTHING");
		User UserCreated = userService.registerUser(User);

		Map<String, Object> data = new HashMap<String, Object>();
		data.put("User", UserCreated);
		String email = "test@gmail.com";
		String activity = "regestered user";
		logsService.savelog(email, activity);
		return new ResponseEntity<>("user registered", HttpStatus.OK);
	}

	public String token;

	private Map<String, String> generateJWTToken(User user) {
		long timestamp = System.currentTimeMillis();
		// System.out.print("current user role:" + user.getRole());
		token = Jwts.builder().signWith(SignatureAlgorithm.HS256,
				Constants.API_SECRET_KEY)
				.setIssuedAt(new Date(timestamp))
				.setExpiration(new Date(timestamp + Constants.TOKEN_VALIDITY))
				.claim("userId", user.getId())
				.claim("email", user.getEmail())
				.claim("firstName", user.getFirstName())
				.claim("lastName", user.getLastName())
				.claim("role", user.getRole())
				// .claim("status", user.getstatus())
				.compact();
		Map<String, String> map = new HashMap<>();
		map.put("token", token);
		return map;
	}
	// 0:client,1:agents,3:staff,4:admin

	@Operation(summary = "This is to  set role to  system  user", security = @SecurityRequirement(name = "bearerAuth"))
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Set role to a user by role id as follows, [0:client,1:agents,3:staff,4:admin]", content = {
					@Content(mediaType = "application/json") }),
			@ApiResponse(responseCode = "404", description = "NOt Available", content = @Content),
			@ApiResponse(responseCode = "403", description = "Forbidden, Authorization token must be provided", content = @Content) })
	@SecurityRequirement(name = "bearerAuth")
	// @Hidden
	@PutMapping("/setrole/{email}")
	public ResponseEntity<User> updateuser(HttpServletRequest request,
			@PathVariable(value = "email") String email,
			@Valid @RequestBody Map<String, String> roleParameters){

		String role = request.getAttribute("role").toString();
		System.out.println("role: --------  " + role);
		// int i = Integer.parseInt(role);
		if (role.equals("ADMIN")) {

			User user = userRepository.findByEmailAddress(email);
			if (user == null) {
				throw new ResourceNotFoundException("User not found :: " + email);
			}

            if(roleParameters.get("role")!= null){
				boolean check= false;
				for(String userRole : Constants.ROLES){
					  
                       if(userRole.equals(roleParameters.get("role")))
					   check= true;
					   System.out.println("is check tre? "+check);
					   System.out.println("role: --------"+userRole);
				}
				if(!check)
				  throw new IllegalStateException("the role should be in " + Arrays.toString(Constants.ROLES));
			}
			user.setRole(roleParameters.get("role")==null? user.getRole() : roleParameters.get("role"));
		
			final User updatedUser = userRepository.save(user);
			String activity = "Updated " + email + "'s role";
			String useremail = request.getAttribute("email").toString();
			// System.out.println(" user email : " +
			// request.getAttribute("email").toString());
			logsService.savelog(useremail, activity);
			return ResponseEntity.ok(updatedUser);

		} else {

			throw new AuthException("Only system administrator can set user role :: ");
		}

	}

	@Operation(summary = "This is to fetch all users from the  Database", security = @SecurityRequirement(name = "bearerAuth"))
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "fetch  all users from database", content = {
					@Content(mediaType = "application/json") }),
			@ApiResponse(responseCode = "404", description = "NOt Available", content = @Content),
			@ApiResponse(responseCode = "403", description = "Forbidden, Authorization token must be provided", content = @Content) })
	@SecurityRequirement(name = "bearerAuth")
	// @Hidden
	@PutMapping("update/{email}")
	public ResponseEntity<User> updateuserdata(HttpServletRequest request,
			@PathVariable(value = "email") String email,
			@Valid @RequestBody User userDetails) {

		String role = request.getAttribute("role").toString();
		System.out.println("role: --------  " + role);
		//int i = Integer.parseInt(role);
		if (role.equals("ADMIN")) {

			User user = userRepository.findByEmailAddress(email);
			if (user == null) {
				throw new ResourceNotFoundException("User not found :: " + email);
			}

			user.setFirstName(userDetails.getFirstName() != null ? userDetails.getFirstName() : user.getFirstName());
			user.setLastName(userDetails.getLastName() != null ? userDetails.getLastName() : user.getLastName());
			user.setEmail(userDetails.getEmail() != null ? userDetails.getEmail() : user.getEmail());
			user.setPassword(userDetails.getPassword() != null ? userDetails.getPassword() : user.getPassword());
			// user.setRole(userDetails.getRole()!=null ?
			// userDetails.getRole():user.getRole());
			user.setstatus(userDetails.getstatus() != null ? userDetails.getstatus() : user.getstatus());
			final User updatedUser = userRepository.save(user);
			String activity = "Updated " + email + "'s data";
			String useremail = request.getAttribute("email").toString();
			// System.out.println(" user email : " +
			// request.getAttribute("email").toString());
			logsService.savelog(useremail, activity);
			return ResponseEntity.ok(updatedUser);

		} else {

			throw new AuthException("Only system administrator can set user role :: ");
		}

	}

}
