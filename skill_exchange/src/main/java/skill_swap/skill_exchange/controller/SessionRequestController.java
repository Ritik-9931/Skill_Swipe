package skill_swap.skill_exchange.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import skill_swap.skill_exchange.dto.request.SessionRequestCreateRequest;
import skill_swap.skill_exchange.model.SessionRequest;
import skill_swap.skill_exchange.service.serviceImpl.SessionRequestServiceImpl;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/sessionRequests")
@SecurityRequirement(name = "bearerAuth")
public class SessionRequestController {

    @Autowired
    private SessionRequestServiceImpl sessionRequestService;

    @PostMapping
    public List<SessionRequest> createRequests(@RequestBody SessionRequestCreateRequest request) {

        return sessionRequestService.createRequests(
                request.getRequesterId(),
                request.getReceiverIds(),
                request.getSkillId(),
                request.getMessage()
        );
    }

    @PutMapping("/{id}/accept")
    public SessionRequest acceptRequest(@PathVariable Long id) {

        return sessionRequestService.acceptRequest(id);
    }

    @PutMapping("/{id}/reject")
    public SessionRequest rejectRequest(@PathVariable Long id) {

        return sessionRequestService.rejectRequest(id);
    }

    @GetMapping("/requester/{userId}")
    public List<SessionRequest> getRequesterRequests(@PathVariable Long userId) {

        return sessionRequestService.getRequestsByRequester(userId);
    }

    @GetMapping("/receiver/{userId}")
    public List<SessionRequest> getReceiverRequests(@PathVariable Long userId) {

        return sessionRequestService.getRequestsByReceiver(userId);
    }
}