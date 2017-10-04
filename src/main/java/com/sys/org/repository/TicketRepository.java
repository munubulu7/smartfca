package com.sys.org.repository;

import com.sys.org.domain.Ticket;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Ticket entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TicketRepository extends JpaRepository<Ticket,Long> {

    @Query("select ticket from Ticket ticket where ticket.ticketGenerator.login = ?#{principal.username}")
    List<Ticket> findByTicketGeneratorIsCurrentUser();

    @Query("select ticket from Ticket ticket where ticket.ticketAssignee.login = ?#{principal.username}")
    List<Ticket> findByTicketAssigneeIsCurrentUser();
    
}
